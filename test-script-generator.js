// test-script-generator.js
// Test script to call the generate-script API directly and see raw response

async function main() {
  // Test payload matching what the UI sends
  const payload = {
    prompt: "AI video scripts for technical startups.",
    videoType: "Feature Demo",
    toolsInvolved: ["Neon"],
    targetAudience: ["DevOps Professionals"],
    videoLength: "0 to 2 Minutes",
    linkForRef: ""
  };

  try {
    console.log("🚀 Calling API with payload:", JSON.stringify(payload, null, 2));
    console.log("📡 URL: http://localhost:3000/api/generate-script\n");

    const res = await fetch("http://localhost:3000/api/generate-script", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    // IMPORTANT: Get raw text first, don't assume JSON
    const text = await res.text();
    
    console.log("=".repeat(60));
    console.log("📊 RESPONSE STATUS:", res.status);
    console.log("📋 RESPONSE HEADERS:");
    console.log(JSON.stringify(Object.fromEntries(res.headers), null, 2));
    console.log("=".repeat(60));
    console.log("📄 RAW RESPONSE BODY:");
    console.log(text);
    console.log("=".repeat(60));

    // Try to parse as JSON only if content-type indicates JSON
    const contentType = res.headers.get("content-type") || "";
    console.log("🔍 Content-Type:", contentType);

    if (contentType.includes("application/json")) {
      try {
        const json = JSON.parse(text);
        console.log("\n✅ Successfully parsed as JSON:");
        console.log(JSON.stringify(json, null, 2));
      } catch (parseError) {
        console.log("\n❌ Content-Type says JSON but failed to parse:");
        console.log(parseError.message);
      }
    } else {
      console.log("\n⚠️  Response is NOT JSON - this will break the client!");
      console.log("⚠️  First 200 chars:", text.substring(0, 200));
      if (text.includes("A server error") || text.includes("server error")) {
        console.log("\n❌ FOUND: Server is returning HTML error page instead of JSON!");
      }
    }
  } catch (error) {
    console.error("❌ Error calling API:", error.message);
    console.error(error.stack);
  }
}

main().catch(console.error);


