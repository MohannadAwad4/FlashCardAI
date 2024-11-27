
/* eslint-disable */

import { NextResponse } from "next/server";
//import clientPromise from "@/utils/mongodb";
import Anthropic from "@anthropic-ai/sdk";
import { flash_card_tool,create_flashcard_set } from "./tools/FlashCardTools";

export async function POST(req: Request) {
  const { topic } = await req.json();

  if (!topic) {
    return NextResponse.json({ error: "Topic is required" }, { status: 400 });
  }

  try {
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_KEY });

    const response = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
      max_tokens: 500,
      tools:[flash_card_tool],
      //tools=[create_flashcard_set],
      temperature: 0,
      system: "You have access to tools, create only 5 flashcards per request, but only use them when necessary(if user requests flashcards). If a tool is not required, respond as normal: ",
      messages: [
        {
          role: "user",
          content: `${topic}`,
        },
      ],
      
    });
    
    if (response.stop_reason === "tool_use") {
      const len = response.content.length
      const toolUse = response.content[len-1]; // Adjust according to SDK documentation
      const toolName = toolUse.name;
      const toolInput = toolUse.input;
      console.log("TOOL BEING USED", toolName, toolInput);
    
      // Call the appropriate tool function
      if (toolName === "create_flashcard_set") {
        await create_flashcard_set(toolInput.topic, toolInput.flashcards);
      }
    }
    
    const reply = response.content[0]?.text || "No response available.";

    return NextResponse.json({ reply });
    
  } catch (error) {
    console.error("Error in POST /api/flashcards/create:", error);
    return NextResponse.json({ error: "Failed to create flashcard set" }, { status: 500 });
  }
}


// import { NextResponse } from "next/server";
// //import clientPromise from "@/utils/mongodb";
// import Anthropic from "@anthropic-ai/sdk";
// import { flash_card_tool,create_flashcard_set } from "./tools/FlashCardTools";

// export async function POST(req: Request) {
//   const { topic } = await req.json();

//   if (!topic) {
//     return NextResponse.json({ error: "Topic is required" }, { status: 400 });
//   }

//   try {
//     const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_KEY });

//     const response = await anthropic.messages.create({
//     model: "claude-3-5-sonnet-20241022",
//       max_tokens: 500,
//       tools:[flash_card_tool],
//       //tools=[create_flashcard_set],
//       temperature: 0,
//       system: "You have access to tools, create only 5 flashcards per request, but only use them when necessary(if user requests flashcards). If a tool is not required, respond as normal: ",
//       messages: [
//         {
//           role: "user",
//           content: `${topic}`,
//         },
//       ],
      
//     });
    
//     if (response.stop_reason === "tool_use") {
//       const len = response.content.length
//       const toolUse = response.content[len-1]; // Adjust according to SDK documentation
//        // @ts-expect-error: Suppress TypeScript error for tool_name
//       const toolName = response.tool_name;
//       // @ts-expect-error: Suppress TypeScript error for input property
//       const toolInput = toolUse.input;
//       console.log("TOOL BEING USED", toolName, toolInput);
    
//       // Call the appropriate tool function
//       if (toolName === "create_flashcard_set") {
//         await create_flashcard_set(toolInput.topic, toolInput.flashcards);
//       }
//     }

//     // @ts-expect-error: Suppress TypeScript error for text property
//     const reply = response.content[0]?.text || "No response available.";

//     return NextResponse.json({ reply });
    
//   } catch (error) {
//     console.error("Error in POST /api/flashcards/create:", error);
//     return NextResponse.json({ error: "Failed to create flashcard set" }, { status: 500 });
//   }
// }


