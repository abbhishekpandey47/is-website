const ScriptData = [
    {
    id: 1,
    intro: "[Write the same intro text from above in full sentences — summarize purpose, who it’s for, and why it’s important.]",
    videoType: "[Video Type e.g., Tool Comparison, Tutorial, Review]",
    title: "Testimonial Video Script",
    duration: "8 min",
    author: "[Author or Team Name]",
    category: "Productivity",
    content: `# [Video Type]: [Main Title]

## Introduction [00:00–00:36]
[Write the same intro text from above in full sentences — summarize purpose, who it’s for, and why it’s important.]

## Setup [00:36–01:12]
[Describe how you prepared the test or demo environment for a fair comparison.]
\`\`\`bash
git clone [repo_url]
cd [project_name]
npm install
\`\`\`
(Replace [repo_url] and [project_name] with actual values)

## The Prompt (Exact) [01:12–01:30]
Prompt: "[Exact prompt used in testing]"

* Explain why you chose this prompt and what it’s designed to test.
* Mention what skill or feature it assesses.

## Tool-by-Tool Breakdown [01:30–05:42]

**[Tool Name 1] – [Start Time–End Time]**
* Repo Understanding: [Short description]
* Implementation Details: [Short description]
* UI & Design Quality: [Short description]
* Speed: [Fast/Medium/Slow]
* Correctness: [High/Medium/Low]
* Repo Awareness: [Excellent/Needs Guidance/etc.]

**Strengths:**
✅ [Strength 1]  
✅ [Strength 2]  
✅ [Strength 3]  

**Limitations:**
❌ [Limitation 1]  
❌ [Limitation 2]  

**[Tool Name 2] – [Start Time–End Time]**
* Repo Understanding: [Short description]
* Implementation Details: [Short description]
* UI & Design Quality: [Short description]
* Speed: [Fast/Medium/Slow]
* Correctness: [High/Medium/Low]
* Repo Awareness: [Excellent/Needs Guidance/etc.]

**Strengths:**
✅ [Strength 1]  
✅ [Strength 2]  
✅ [Strength 3]  

**Limitations:**
❌ [Limitation 1]  
❌ [Limitation 2]  

**[Tool Name 3] – [Start Time–End Time]**
* Repo Understanding: [Short description]
* Implementation Details: [Short description]
* UI & Design Quality: [Short description]
* Speed: [Fast/Medium/Slow]
* Correctness: [High/Medium/Low]
* Repo Awareness: [Excellent/Needs Guidance/etc.]

**Strengths:**
✅ [Strength 1]  
✅ [Strength 2]  
✅ [Strength 3]  

**Limitations:**
❌ [Limitation 1]  
❌ [Limitation 2]  

## Outro Script [05:42–06:18]
[Summarize the key findings. Mention which tool is best for which type of user or situation.]

## Call to Action [06:18–06:36]
✅ Drop a like if you found this useful  
💬 Tell us which prompt or tool to test next in the comments
`,
},
      {
    id: 2,
    videoType: "Product Demo",
     intro: "In this video, we are going to see how thousands of [type of companies] are using [product name] to [main benefit] — and how you and your team can [main action] with [product name].",
    title: "Software Demo Video Script",
    duration: "5 min",
    author: "[Author or Presenter Name]",
    category: "SaaS",

    content: `# [Main Video Title]

## Hook [00:00–00:10]
In this video, we are going to see how thousands of [type of companies] are using [product name] to [main benefit] — and how you and your team can [main action] with [product name].

Roll the intro!

## Intro B-roll or Logo [00:10–00:15]
[Describe the intro sequence — short b-roll, logo animation, and series name if applicable.]

Example inspiration:
- https://youtu.be/
- https://youtu.be/

## Greetings [00:15–00:30]
Hey everyone, and happy [day of the week]! My name is [name], and I’m the [role] at [company name].  
But for the sake of this video, you can think of me as your personal [product name] coach.  

Now let's get started on today's video.

## Content Body [00:30–XX:XX]
[Step-by-step demo or walkthrough content here.]

**Tips for building this section:**
- Keep it simple and concise.
- Go through the process before writing the script.
- Avoid complex jargon — your audience may be new to the product.
- Mention the most common use case, target user, and key features.
- Use smooth transition phrases like:
    - "Moving on, the next step is to..."
    - "First things first, you need to..."
    - "Speaking of [feature], let me show you..."
    - "Lastly, you can..."
- Insert navigational CTAs where relevant:
    - "We’ve covered [topic] in a previous video — link below."
    - "Hit the notification on screen for a deep dive into [feature]."
    - "If you get stuck here, reach out to support."

## Product CTA [XX:XX–XX:XX]
If you want to try out a demo of [product name], click the link in the description box below to get started.  
You can also book a demo call using the calendar link in the description, and a team member will onboard you personally.

## Outro [Last 15–20 sec]
And that's a wrap-up!  
In this video, we covered how to get started with [product name] and how to win at [product use case].  
You’ll find links to the product and a demo booking calendar in the description box below.  

Catch you next time — and thanks for watching!`
},

     {
    id: 3,
    videoType: "Software Tutorial",
    title: "Software Tutorial Video Script",
    intro:"Are you new to [product name] and need some help navigating through [feature name]? In this short step-by-step guide, I will show you exactly how to [action].",
    duration: "3 min",
    author: "[Author or Presenter Name]",
    category: "Education",

    content: `# Software Tutorial Video Script

## Hook [00:00–00:10]
Are you new to [product name] and need some help navigating through [feature name]?  
In this short step-by-step guide, I will show you exactly how to [action].  

Alright, let's hit it!

## Intro B-roll or Logo [00:10–00:15]
[Describe intro sequence — short video b-roll, logo animation, or series name.]

## Greetings [00:15–00:30]
What's up, guys, my name is [name], and I want to welcome you to another [channel/company name] video.  
I am pumped to be here and get the opportunity to teach you more about [video topic].  

Let's begin.

## Content Body [00:30–XX:XX]
[Step-by-step tutorial instructions go here.]

**Tips for building this section:**
- Keep it simple and to the point.
- Test the process before writing the tutorial.
- Consider software limitations across devices, subscriptions, resolutions, etc.
- Avoid jargon and long sentences.
- Be precise — assume the user is new.
- Use smooth transitions:
    - "Moving on, the next step is to..."
    - "First things first, you need to..."
    - "Speaking of [feature], let me show you..."
    - "Lastly, you can..."
- Add navigational CTAs where needed:
    - "We’ve covered [topic] in a previous video — link below."
    - "Hit the notification on screen to learn more about [feature]."
    - "If you’re stuck, reach out to support."
    - "We have a full course linked in the comments below."

## YouTube Channel CTA [XX:XX–XX:XX]
If this video provided any value to you, please hit that like and subscribe button.  
This helps you get more awesome videos like this one in your feed and keeps you in the loop with all things [industry/topic].

## Outro [Last 15–20 sec]
I hope you found this video useful and that [topic] is now a bit clearer than before you started watching.  

Got any questions? Drop them in the comments — I’d love to answer them for you.  

Till the next one, this has been [name] — take care!`
},

   {
  id: 4,
  videoType: "Product Tutorial",
  title: "Software Onboarding Video Script",
  intro: "If you’re here to learn more about the absolute best [tool type], you’re in luck! Let me show you how to get started with [Product name].",
  duration: "4 min",
  author: "[Presenter Name]",
  category: "Education",
  company: "Infrasity",
  content: `# [Product Name] - Getting Started Guide

## Hook [00:00–00:10]
If you’re here to learn more about the absolute best [tool type], well, you are in luck! Let me show you how to get started with [Product name].

Let’s kick it!

## Intro B-roll or Logo [00:10–00:15]
Play a short video b-roll or a transition in and out of your logo and maybe the name of the series if applicable.
Examples:
- https://youtu.be/
- https://youtu.be/

## Greetings [00:15–00:30]
Hello hello, everyone! I’m [Name] from Infrasity. The product/tool that [specify what you do and what problem you solve for others].

Let me show you around.

## Content Body [00:30–XX:XX]
[Step-by-step tutorial content here]

**Tips for building this section:**
- Keep it simple and to the point.
- Test the process before writing.
- Consider software limitations (devices, subscriptions, resolutions).
- Avoid jargon and long sentences.
- Be precise — assume the viewer is new.
- Use smooth transitions like:
    - "Moving on, the next step is to..."
    - "First things first, you need to..."
    - "Speaking of [feature], let me show you..."
    - "Lastly, you can..."
- Navigational CTAs:
    - "We’ve covered [topic] in a previous video — link below."
    - "Hit the notification on screen to learn more about [feature]."
    - "If you’re stuck, reach out to support."
    - "We have a full course linked in the comments below."

## Product CTA [XX:XX–XX:XX]
And that’s a wrap on how you can get started using [product/tool name].

If you're interested in learning finer details on how to use [product/tool name], check out our other tutorials linked below.

If you want to try a demo of our product, click the link in the description to go to our homepage and get started.

## Outro [Last 15–20 sec]
We'd love it if you joined our community by liking this video, subscribing, and hitting the bell so you never miss a future video.

If you have questions about [product name], drop them in the comments and we’ll cover them in another tutorial.

Till the next one, stay awesome guys.`
},

{
    "id": 5,
    "videoType": "Product Introduction",
    "title": "Product Hunt Video Script",
    "intro": "Hey, hey fellow product hunters! Are you ready to have your mind blown? We've built [Product Name], and we think it will improve the way you do [action].",
    "duration": "3 min",
    "author": "[Author or Presenter Name]",
    "category": "Education",
    "content": `# [Product Name] Introduction Video Script

## Hook [00:00–00:10]
Hey, hey fellow product hunters! Are you ready to have your mind blown?  
We've built [Product Name], and we think it will improve the way you do [action].  

Check it out!

## Intro B-roll or Logo [00:10–00:15]
[Split-second logo reveal to keep things visually engaging, light, and entertaining while establishing your branding.]

## Greetings [00:15–00:30]
What’s up, everyone! Fancy seeing you here today.  
So, let me get straight into it and tell you about our baby, [Product Name].  

Let’s dive in!

## Content Body [00:30–XX:XX]
[Step-by-step introduction and instructions go here, covering the following topics:]
- Who is this for: Explain the target audience for [Product Name].
- How other companies are using it: Share examples of how businesses or users are leveraging [Product Name].
- How to start using it: Provide clear, beginner-friendly steps to get started with [Product Name].
- Where to find relevant resources: Guide users to additional help or materials.
- Core product features: Highlight the key features that make [Product Name] unique.

**Tips for building this section:**
- Keep it simple and to the point.
- Go through the process yourself before writing the script.
- Consider software limitations across devices, subscription types, resolutions, etc.
- Avoid long phrases and hard-to-understand words.
- Be precise, assuming users are new to [Product Name].
- Read your script out loud to ensure it sounds natural.
- Ask for feedback before recording the video.
- Use smooth transitions:
    - "Moving on, the next step is to..."
    - "Let’s start with..."
    - "First things first, you need to..."
    - "Once you nailed [step], you can move on to..."
    - "Speaking of [feature], let me show you how to..."
    - "Now that we got that out of the way, you can get started with..."
    - "We’re almost done; the final step is to..."
    - "Lastly, you can..."
- Add navigational CTAs where needed:
    - "We have covered [topic] in a previous video, you can find it linked below."
    - "Hit the notification that popped up on the screen to watch a video covering [feature]."
    - "If you are having trouble with this step, feel free to reach out to support, and we’ll get it working for you."
    - "Speaking of [feature], we have a full course on nailing [feature] that I’ve linked in the comments below."

## Promo Code CTA [XX:XX–XX:XX]
Because we love the PH community, everything you saw so far is available to you at a discount.  
We have a lifetime deal going, and you can find the promo code for that in the description box below.

## Feedback Request CTA [XX:XX–XX:XX]
We really want to know what you think of [Product Name], so leave us a comment with all your feedback and positive criticism.

## Outro [Last 15–20 sec]
If you made it this far, you’re fantastic, and I want to thank you so much for your time.  

Thank you guys for your support, and I’m looking forward to seeing all the creative ways you use [Product Name].  

Sending you all good vibes. See ya!

---

**Additional Resource**:  
Get more hooks, intros, greetings, and more by accessing our database of hundreds of ideas at https://infrasity.com/tools/ai-script-generator/templates.`
},

{
    "id": 6,
    "videoType": "Software Tutorial",
    "title": "How-To Video Script",
    "intro": "In today’s video, I’m going to show you how to [action], and get it done in the best and most efficient way possible.",
    "duration": "3 min",
    "author": "[Author or Presenter Name]",
    "category": "Education",
    "content": `# How to [Action] with [Product Name] Video Script

## Hook [00:00–00:10]
In today’s video, I’m going to show you how to [action], and get it done in the best and most efficient way possible.  

Roll the intro!

## Intro B-roll or Logo [00:10–00:15]
[Short logo animation or b-roll to establish branding and keep the visuals engaging.]

## Greetings [00:15–00:30]
Hey there, beautiful people! Thanks for tuning in to another [Company/Channel Name] video.  
I’m [name], and I don’t want to waste any of your time.  

So, let’s get right into it.  

How do you [action]?

## Content Body [00:30–XX:XX]
[Step-by-step tutorial instructions go here, covering the following topics:]  
- Who is this for: Explain the target audience for [Product Name].  
- How other companies are using it: Share examples of how businesses or users are leveraging [Product Name].  
- How to start using it: Provide clear, beginner-friendly steps to get started with [Product Name].  
- Where to find relevant resources: Guide users to additional help or materials.  
- Core product features: Highlight the key features that make [Product Name] unique.

**Tips for building this section:**  
- Keep it simple and to the point.  
- Go through the process yourself before writing the script.  
- Consider software limitations across devices, subscription types, resolutions, etc.  
- Avoid long phrases and hard-to-understand words.  
- Be precise, assuming users are new to [Product Name].  
- Read your script out loud to ensure it sounds natural.  
- Ask for feedback before recording the video.  
- Use smooth transitions:  
    - "Moving on, the next step is to..."  
    - "Let’s start with..."  
    - "First things first, you need to..."  
    - "Once you nailed [step], you can move on to..."  
    - "Speaking of [feature], let me show you how to..."  
    - "Now that we got that out of the way, you can get started with..."  
    - "We’re almost done; the final step is to..."  
    - "Lastly, you can..."  
- Add navigational CTAs where needed:  
    - "We have covered [topic] in a previous video, you can find it linked below."  
    - "Hit the notification that popped up on the screen to watch a video covering [feature]."  
    - "If you are having trouble with this step, feel free to reach out to support, and we’ll get it working for you."  
    - "Speaking of [feature], we have a full course on nailing [feature] that I’ve linked in the comments below."

## Pre-Outro [XX:XX–XX:XX]
And that’s it, guys!  

In this video, you learned how to [first point], [second point], and [third point].  

If you’re still curious to learn more, you can find even more information about this topic in my [resource: e-book, other videos, etc.] that you can find linked below in the description box.

## Promo Code CTA [XX:XX–XX:XX]
If you want to give [Product Name] a try, then you’re in luck! I have a promo code just for you guys to use to get you started.  

Just go to www.[productname].com and enter the code [NAMEX] for [X]% off your first [subscription, purchase, etc.].

## Feedback Request CTA [XX:XX–XX:XX]
I hope you found this video on [video topic] useful, and you’ll begin to implement the things you’ve learned here today.  

If you did, please like this video since it really helps support my channel and subscribe so you never miss a beat.  

Drop a comment down below telling me what tutorial you guys want to see next!

## Outro [Last 15–20 sec]
Thanks for joining me on my corner of the internet today.  

Stay weird, pals.  

See ya!

---

**Additional Resource**:  
Get more hooks, intros, greetings, and more by accessing our database of hundreds of ideas at http://infrasity.com/tools/ai-script-generator/templates.`
},

{
    "id": 7,
    "videoType": "Feature Tutorial",
    "title": "Feature Spotlight Video Script",
    "intro": "There's a 50% chance you've requested this feature before, and so I have some great news. Our most requested feature, [feature name], made it to [product name]; let me show you how to use it.",
    "duration": "3 min",
    "author": "[Author or Presenter Name]",
    "category": "Education",
    "content": `# How to Use [Feature Name] in [Product Name] Video Script

## Hook [00:00–00:10]
There's a 50% chance you've requested this feature before, and so I have some great news.  
Our most requested feature, [feature name], made it to [product name]; let me show you how to use it.  

Alright. Que the intro!

## Intro B-roll or Logo [00:10–00:15]
[Play a short video b-roll or a transition in and out of your logo, and maybe the name of the series if applicable. Examples: https://youtu.be/gnpQK6G9N4E?t=3, https://youtu.be/-iEQGktDQzs?t=26.]

## Greetings [00:15–00:30]
Hi there, I'm [name], and I'm the [relevant expert title] from [company name] here to help you navigate through our brand new feature — [feature name].  

Let’s get started!

## Content Body [00:30–XX:XX]
[Step-by-step tutorial instructions for using [feature name] go here, covering the following topics:]  
- Who is this for: Explain the target audience for [feature name].  
- How other companies are using it: Share examples of how businesses or users are leveraging [feature name].  
- How to start using it: Provide clear, beginner-friendly steps to get started with [feature name].  
- Where to find relevant resources: Guide users to additional help or materials.  
- Core product features: Highlight the key aspects of [feature name] that make it valuable.

**Tips for building this section:**  
- Keep it simple and to the point.  
- Go through the process yourself before writing the script.  
- Consider software limitations across devices, subscription types, resolutions, etc.  
- Avoid long phrases and hard-to-understand words.  
- Be precise, assuming users are new to [feature name].  
- Read your script out loud to ensure it sounds natural.  
- Ask for feedback before recording the video.  
- Use smooth transitions:  
    - "Moving on, the next step is to..."  
    - "Let’s start with..."  
    - "First things first, you need to..."  
    - "Once you nailed [step], you can move on to..."  
    - "Speaking of [feature], let me show you how to..."  
    - "Now that we got that out of the way, you can get started with..."  
    - "We’re almost done; the final step is to..."  
    - "Lastly, you can..."  
- Add navigational CTAs where needed:  
    - "We have covered [topic] in a previous video, you can find it linked below."  
    - "Hit the notification that popped up on the screen to watch a video covering [feature]."  
    - "If you are having trouble with this step, feel free to reach out to support, and we’ll get it working for you."  
    - "Speaking of [feature], we have a full course on nailing [feature] that I’ve linked in the comments below."

## Product CTA [XX:XX–XX:XX]
Everything you saw so far is available to you at a discount. We have a [deal type] going, and you can find the promo code for that in the description box below.  

*Or*  

If you want to try out a demo of our product, click on the link in the description box below to get started.

## Outro [Last 15–20 sec]
I hope you found this video useful and [feature name] is a bit clearer than before you started watching this video.  

I invite you to give it a try and let me know what you think about it in the comments below.  

Until the next video, I'll catch you in our [Discord server, Facebook community, Slack group, etc.].  

Till the next one, take care!

---

**Additional Resource**:  
Get more hooks, intros, greetings, and more by accessing our database of hundreds of ideas at https://infrasity.com/tools/ai-script-generator/templates 
`},
{
    "id": 8,
    "videoType": "Educational Explainer",
    "title": "Explainer Video Script",
    "intro": "In this video, we're going to break down [relevant topics and subcategories of it. Ex: marketing, how it works, and why it's important.] and try to help you get a better understanding of it.",
    "duration": "3 min",
    "author": "[Author or Presenter Name]",
    "category": "Education",
    "content": `# Understanding [Topic Name]: A Comprehensive Guide Video Script

## Hook [00:00–00:10]
In this video, we're going to break down [relevant topics and subcategories of it. Ex: marketing, how it works, and why it's important.] and try to help you get a better understanding of it.  

So if you’re interested in learning more about all of this, then stay tuned.

## Intro B-roll or Logo [00:10–00:15]
[Short logo animation or b-roll to establish branding and keep the visuals engaging.]

## Greetings [00:15–00:30]
What's up, guys, my name is [Name], and welcome to another [Channel/Company Name] video.  

If this is your first time watching a [Company Name] video, it's good to have you here. We are a [company description] company, and we post [post frequency] on all things [covered topics].  

Now, let’s get into the real reason you’re here: [topic name].

## Content Body [00:30–XX:XX]
[Detailed explanation and breakdown of [topic name] go here, covering the following topics:]  
- What is this video about: Provide a clear overview of [topic name].  
- 3-5 main points on the topic: Share key insights or steps related to [topic name].  
- Benefits of learning more about this topic: Explain why understanding [topic name] is valuable.  
- Where to find more relevant resources: Guide users to additional help or materials.  
- Offer a product relevant to the topic: Introduce a product that supports [topic name].  

**Tips for building this section:**  
- Keep it simple and to the point.  
- Go through the process yourself before writing the script.  
- Consider software limitations across devices, subscription types, resolutions, etc.  
- Avoid long phrases and hard-to-understand words.  
- Be precise, assuming users are new to [topic name].  
- Read your script out loud to ensure it sounds natural.  
- Ask for feedback before recording the video.  
- Use smooth transitions:  
    - "Moving on, the next step is to..."  
    - "Let’s start with..."  
    - "First things first, you need to..."  
    - "Once you nailed [step], you can move on to..."  
    - "Speaking of [topic], let me show you how to..."  
    - "Now that we got that out of the way, you can get started with..."  
    - "We’re almost done; the final step is to..."  
    - "Lastly, you can..."  
- Add navigational CTAs where needed:  
    - "We have covered [subtopic] in a previous video, you can find it linked below."  
    - "Hit the notification that popped up on the screen to watch a video covering [subtopic]."  
    - "If you are having trouble with this step, feel free to reach out to support, and we’ll get it working for you."  
    - "Speaking of [topic], we have a full course on nailing [topic] that I’ve linked in the comments below."

## Pre-Outro [XX:XX–XX:XX]
And that's a wrap-up. In this video, we covered [first point], [second point], and [third point].  

If you’re still curious about [video topic], you can find even more information about it in our [resource] that you can find linked below.

## Promo Code CTA [XX:XX–XX:XX]
To help you get your work done better and faster, you can use our product, [product name]. If you want to try it out, you can use the code [Enter promo code here] and try it out for free.

## Feedback Request CTA [XX:XX–XX:XX]
If today's video was helpful to you, help us out by hitting that like button and drop a comment in the comments section below with your take on [the topic of the video]!  

Don’t forget to subscribe and join the [product name] fam, so you never miss a video.

## Outro [Last 15–20 sec]
Alright, that’s it, guys!  

Stay safe out there and see you soon. Peace!

---

**Additional Resource**:  
Get more hooks, intros, greetings, and more by accessing our database of hundreds of ideas at https://infrasity.com/tools/ai-script-generator/templates.`
},
// {
//     "id": 9,
//     "videoType": "Community Introduction",
//     "title": "Community Onboarding Video",
//     "intro": "You made it to the [name] community! We’re so glad you made it! This video will quickly show you the ropes of our [community].",
//     "duration": "3 min",
//     "author": "[Author or Presenter Name]",
//     "category": "Education",
//     "content": `# Welcome to the [Name] Community: Get Started Guide Video Script

// ## Hook [00:00–00:10]
// You made it to the [name] community! We’re so glad you made it!  
// This video will quickly show you the ropes of our [community].  

// Roll the intro, please!

// ## Intro B-roll or Logo [00:10–00:15]
// [Short logo animation or b-roll to establish branding and keep the visuals engaging.]

// ## Greetings [00:15–00:30]
// Hey everyone, and happy [day of the week]!  
// I hope you all have had a fabulous start to your day. Now let's get started on today's video.

// ## Content Body [00:30–XX:XX]
// [Step-by-step guide to navigating the [name] community goes here, covering the following topics:]  
// - Who is this for: Explain the target audience for the [name] community.  
// - Relevant channels they should join: Highlight key platforms or channels for community interaction.  
// - Community Guidelines: Share the rules or expectations for participation.  
// - Key people in the community: Introduce important members or moderators.  
// - How to make the most of this community: Provide tips for engaging and benefiting from the community.  

// **Tips for building this section:**  
// - Keep it simple and to the point.  
// - Go through the process yourself before writing the script.  
// - Consider software limitations across devices, subscription types, resolutions, etc.  
// - Avoid long phrases and hard-to-understand words.  
// - Be precise, assuming users are new to the [name] community.  
// - Read your script out loud to ensure it sounds natural.  
// - Ask for feedback before recording the video.  
// - Use smooth transitions:  
//     - "Moving on, the next step is to..."  
//     - "Let’s start with..."  
//     - "First things first, you need to..."  
//     - "Once you nailed [step], you can move on to..."  
//     - "Speaking of [topic], let me show you how to..."  
//     - "Now that we got that out of the way, you can get started with..."  
//     - "We’re almost done; the final step is to..."  
//     - "Lastly, you can..."  
// - Add navigational CTAs where needed:  
//     - "We have covered [topic] in a previous video, you can find it linked below."  
//     - "Hit the notification that popped up on the screen to watch a video covering [topic]."  
//     - "If you are having trouble with this step, feel free to reach out to support, and we’ll get it working for you."  
//     - "Speaking of [topic], we have a full course on nailing [topic] that I’ve linked in the comments below."

// ## Relevant Resources CTA [XX:XX–XX:XX]
// If you want to know more about our community, then I recommend you check out our YouTube channel. I’ll link a few relevant videos for you in the description box below.

// ## Feedback Request CTA [XX:XX–XX:XX]
// If you have any questions for us, hit us up on [relevant channel] or drop a comment in the box below, and someone from the team will get back to you as soon as possible.

// ## Outro [Last 15–20 sec]
// If you made it this far, you are fantastic, and I want to thank you so much for your time.  

// I hope you found this video useful, and I’m looking forward to seeing you out there.  

// Sending you all good vibes. See ya!

// ---

// **Additional Resource**:  
// Get more hooks, intros, greetings, and more by accessing our database of hundreds of ideas at https://infrasity.com/tools/ai-script-generator/templates.`
// },
// {
//   "id": 10,
//   "videoType": "Product Demo",
//   "title": "AI Agent Demo Script",
//   "intro": "In this video, we'll show you how an AI Agent can simplify and speed up your workflow—step by step, live.",
//   "duration": "15–18 min",
//   "author": "[Author or Presenter Name]",
//   "category": "Technology",
//   "content": "# AI Agent Demo Script\n\n## Hook [00:00–00:20]\nWatch how an AI Agent can read your task, think for a second, and complete it—faster than you ever could. Ready to see smart automation in action?\n\n## Greetings [00:20–00:40]\nHey everyone! Today, you’ll see our AI Agent in action—from understanding your command to delivering a useful result. Let’s get started.\n\n## Content Body\n- **00:40 – Intro & Context**  \n  Brief overview of what the demo will cover and why AI Agents are becoming essential tools for productivity and automation.\n\n- **01:20 – What is an AI Agent?**  \n  Explain clearly: an AI Agent can read, reason, plan, and act across tools or tasks. Emphasize the difference from standard chat-based AI.\n\n- **03:00 – LLM vs Agent**  \n  Show the distinction: LLMs generate responses, while agents *plan, decide, and execute* multi-step workflows autonomously.\n\n- **05:00 – Live Agent Demo**  \n  Step-by-step demo:\n    1. Enter a real-world prompt (e.g., summarize an article, draft an email).\n    2. Agent processes the task, calls tools/APIs.\n    3. Produces final output—clean, actionable, and ready to use.\n\n- **09:00 – Breaking Down the Demo**  \n  Explain what happened behind the scenes: how the agent interpreted the prompt, used reasoning, and selected tools to complete the task.\n\n- **11:00 – Agentic Design Patterns**  \n  Introduce common approaches: planning loops, memory usage, decision strategies. Explain how these make agents adaptable for different tasks.\n\n- **14:00 – Multi-Agent Workflows**  \n  Show how multiple agents can collaborate: research, analysis, summarization, and reporting, working together seamlessly.\n\n- **17:00 – Building a No-Code Agent (n8n Example)**  \n  Demonstrate how to create an agent visually using n8n. Emphasize how non-developers can build useful automations quickly.\n\n- **20:00 – Practical Use Cases**  \n  Real-world examples: automated reports, customer support, market research, research summaries, personal productivity tasks.\n\n- **22:00 – Addressing Concerns**  \n  Discuss reliability, data privacy, and skepticism. Provide reassurance while staying realistic about agent limitations.\n\n- **24:00 – Local Agent Options**  \n  Introduce open-source or local-first agent options for users who prioritize privacy or offline capabilities.\n\n- **26:00 – Key Takeaways & Closing Thoughts**  \n  Recap the demo and highlight the benefits of AI Agents. Encourage viewers to explore building or using their own agents.\n\n## Outro [26:30–27:00]\nYou can also check out our other videos related to this topic for deeper insights and demos.  \nThat’s it—you just watched an AI Agent work in real time. If you found this demo helpful, hit like, subscribe, and stay tuned for more AI magic. See you next time!\n"
// },
// {
//   "id": 11,
//   "videoType": "Technical Tutorial",
//   "title": "Multi-Agent System Workflow",
//   "intro": "Ever wondered how to design a team of AI agents that collaborate seamlessly to solve complex tasks? Let’s walk through a modular multi-agent system workflow you can build today!",
//   "duration": "6 min",
//   "author": "[Author or Presenter Name]",
//   "category": "Technology",
//   "content": "# Multi-Agent System Workflow Script\n\n## Hook [00:00–00:15]\nImagine breaking a big, messy task into neat, expert steps. What if each step was handled by a specialized AI agent, collaborating quietly behind the scenes? That’s the power of a multi-agent system.\n\nLet’s unpack how it works.\n\n## Intro B-roll or Logo [00:15–00:20]\n[Logo animation, followed by a schematic flow: central supervisor node handing off tasks to agent icons.] \n\n## Greetings [00:20–00:35]\nHey everyone! In today’s walkthrough, we’ll explore how to set up and visualize a multi-agent system using modular agents. You’ll learn not just “what” they are, but **how** to build one for your use case.\n\n## Content Body [00:35–XX:XX]\nHere’s our roadmap:\n\n### 1. Define the Agents & Roles\n- A **Supervisor** agent orchestrates the workflow.  \n- **Specialized Agents** handle specific tasks—like Web Researcher, Trend Analyzer, Report Writer, and Proofreader.  \nThis concept follows a supervisor-network architecture from guides like those on Machine Learning Mastery\n\n### 2. Draw the Workflow Architecture\n- Use **Network** vs. **Supervisor** patterns to decide how agents communicate.\n- Visualize the flow: Supervisor → assigns to Web Researcher → hands results to Trend Analyst → passed to Report Writer → finalized by Proofreader.\n\n### 3. Set Up Communication & Coordination\n- Leverage clear **communication protocols**—e.g. passing structured messages or “prompts” between agents.\n- Define **coordination methods**, like gatekeeping or sequential handoffs.\n\n### 4. Walk Through a Live Example (Inspired by Renotte’s Demo)\n- Present an input prompt (e.g., “Create a report on AI trends”).  \n- Show the Supervisor delegating tasks—first to Web Researcher, then through ANALYSIS, Writing, and Proofreading agents.  \nKeep visuals animated, concise, and intuitive.\n\n### 5. Highlight Benefits & Best Practices\n- **Modularity** = easier maintenance and testing.\n- **Scalability and fault tolerance** from distributed tasks.\n- **Design patterns** like chained requests or gatekeeper agents help orchestrate complex flows.\n\n### 6. Quick Recap and Next Steps\n- Supervisor routes tasks  \n- Agents specialize and collaborate  \n- Workflow scales and adapts\n\n## Relevant Resources CTA [XX:XX–XX:XX]\nWant to build this with real tools? Check the description for links to LangGraph tutorials, AutoGen, n8n walkthroughs, and blog posts with diagrams and code.\n\n## Feedback Request CTA [XX:XX–XX:XX]\nWhat agent workflows would you build—content creation, support bots, analytics? Share your ideas or questions in the comments—we’ll brainstorm together.\n\n## Outro [Last 15–20 sec]\nThanks for watching! If this sparked ideas for smarter workflows, hit like and subscribe. Stay tuned for more deep dives into AI architecture. Until next time—build modular, build smart!\n\n---\n\n**Additional Resource**:\nDiscover more AI agent templates and walkthroughs at https://infrasity.com/tools/ai-script-generator/templates."
// },
// {
//   "id": 12,
//   "videoType": "Technical Walkthrough",
//   "title": "Agent for CI/CD Walkthrough",
//   "intro": "In this demo, we’ll show how an AI agent can automate CI/CD workflows—reducing delays, improving reliability, and streamlining deployment decisions.",
//   "duration": "6 min",
//   "author": "[Author or Presenter Name]",
//   "category": "DevOps",
//   "content": "# Agent for CI/CD Walkthrough Script\n\n## Hook [00:00–00:15]\nEver wish your CI/CD pipeline could triage issues, auto-generate tests, or even trigger safe rollbacks—without you lifting a finger? Today we’ll show how AI agents can step in and do it.\n\nCrank it up—let’s go!\n\n## Intro B-roll or Logo [00:15–00:20]\n[Logo animation, followed by a visual showing agent “icons” bridging between code commit, test run, deployment stages—all orchestrated by a central AI agent.] \n\n## Greetings [00:20–00:40]\nHey everyone! Welcome back. In this demo, we'll walk through a CI/CD pipeline enhanced by an AI agent that triages PRs, adds tests, monitors deploys, and handles rollbacks—saving you time and headaches.\n\n## Content Body [00:40–XX:XX]\nHere’s the roadmap we’ll explore:\n\n1. **Overview: What We’re Automating**\n   - Inspired by “Agentic CI,” we’ll set expectations: agents assist where human judgment slows down pipelines—like flaky tests, merge delays, and deployment rollbacks.\n\n2. **System Architecture**\n   - Show a diagram: AI Agent, orchestrator, test suite, monitoring system, rollback manager.\n   - Explain flow: PR event triggers AI agent → triage and label → optional test generation → deploy decision → monitoring feedback → rollback if needed.\n\n3. **Live Demo Walkthrough**\n   - Input: Developer pushes a PR.\n   - Show the agent analyzing the code, labeling, running tests, and evaluating results.\n   - Show deployment to staging, with agent watching health metrics.\n   - If something fails, the agent decides to rollback and logs a recovery summary.\n\n4. **Transitions & Narration Cues**\n   - “First, let’s start with the PR trigger—watch how the agent kicks in.”\n   - “Now the agent triages the change and spins up tests automatically.”\n   - “Monitor dashboards light up—let’s see how health checks guide the next move.”\n   - “Uh oh—the deployment hit a snag. Watch how the agent handles rollback.”\n\n5. **Insights & Best Practices**\n   - Reference recent research on AI-augmented pipelines that embed agentic decision points and policy-as-code guardrails.\n   - Highlight benefits: faster recovery, more consistent deployments, less human delay.\n   - Emphasize safety: “trust tiers,” audit logs, and human-in-the-loop approval for sensitive changes.\n\n## Relevant Resources CTA [XX:XX–XX:XX]\nWant to recreate this? Check the description for links to the full pipeline code, research paper on AI-augmented CI/CD, and step-by-step setup instructions.\n\n## Feedback Request CTA [XX:XX–XX:XX]\nHow would you use AI agents in your pipeline—auto-testing, rollback, metrics-driven gating? Let me know in the comments—we can co-build smarter workflows.\n\n## Outro [Last 15–20 sec]\nThat’s how AI can help your CI/CD stay fast, smart, and self-healing. If you found this useful, smash that like button, subscribe, and stay tuned for more deep-dive demos. See you in the next one!\n\n---\n\n**Additional Resource**:  \nExplore more template workflows and demos at https://infrasity.com/tools/ai-script-generator/templates."
// },
// {
//   "id": 13,
//   "videoType": "Technology Spotlight",
//   "title": "Security Agent Spotlight Script",
//   "intro": "In this demo, we’ll walk through Spotlight Security AI’s powerful dashboard—showing how it simplifies monitoring, troubleshooting, and reporting in modern network security.",
//   "duration": "3 min",
//   "author": "[Author or Presenter Name]",
//   "category": "Cybersecurity",
//   "content": "# Security Agent Spotlight Script\n\n## Hook [00:00–00:15]\nImagine a dashboard that gives you complete visibility into your networks—instantly highlighting healthy servers, warning states, and critical issues before they spiral. That’s Spotlight Security AI.\n\n## Intro B-roll or Logo [00:15–00:20]\n[Logo animation followed by visuals of Spotlight’s dashboard overview.]\n\n## Greetings [00:20–00:35]\nWelcome back! Today, we’ll explore how Spotlight’s AI-powered dashboard makes network security management intuitive, transparent, and fast.\n\n## Content Body [00:35–02:51]\n- **Dashboard Overview**: After signing in, you land on the main dashboard with a clear summary of all companies and networks under management. The health check highlights which servers are healthy, warning, critical, or offline.\n- **Network and Host View**: Select a network to see detailed host lists—showing service names, VM hosts, OS versions, IP addresses, and current status. Search and filter by OS or status to focus quickly on what matters.\n- **Issue Identification & AI Remediation [01:07]**: When Spotlight flags an issue—like an offline development server—you can view details instantly. AI-powered smart controls explain the problem, suggest secure baseline firewall policies, and generate step-by-step remediation plans.\n  - Review both current and proposed configurations.\n  - Modify commands directly before execution.\n  - Execute through the integrated terminal and monitor results in real time.\n  - Describe additional changes in plain English, and Spotlight generates the correct commands automatically.\n- **Reporting [02:14–02:51]**: Spotlight’s flexible reporting system lets you create comprehensive security reports. Choose companies, select sections, reorder content, and instantly generate professional reports. Download, email, or print for clients and executives.\n\n## Relevant Resources CTA [XX:XX–XX:XX]\nCheck the links below for Spotlight documentation, AI remediation examples, and reporting templates.\n\n## Feedback Request CTA [XX:XX–XX:XX]\nWhat feature of Spotlight would streamline your workflow the most? Share your thoughts in the comments!\n\n## Outro [Last 15–20 sec]\nThanks for watching this Spotlight demo! If you found it insightful, like and subscribe for more AI-driven cybersecurity walkthroughs. Stay secure, and see you in the next one!\n"
// },
// {
//   "id": 14,
//   "videoType": "Overview",
//   "title": "Top 5 AI Agent Frameworks",
//   "intro": "Welcome! In this video, we’ll explore the top five AI agent frameworks developers and organizations are using today to build autonomous, intelligent workflows.",
//   "duration": "5 min",
//   "author": "[Author or Presenter Name]",
//   "category": "Technology",
//   "content": "# Top 5 AI Agent Frameworks Script\n\n## Hook [00:00–00:15]\nEver wondered which frameworks power the smartest AI agents in production today? In this video, we'll explore the top five frameworks giving developers the foundation to build intelligent, autonomous systems.\n\nLet’s dive in!\n\n## Intro B-roll or Logo [00:15–00:20]\n[Logo animation or dynamic visuals hinting at agents, code, and modular workflows to set the tone visually.]\n\n## Greetings [00:20–00:35]\nHello everyone! I’m excited to guide you through the most popular and powerful AI agent frameworks available right now—whether you're building chatbots, autonomous workflows, or multi-agent systems.\n\n## Content Body [00:35–XX:XX]\nIn this overview, we'll briefly showcase the top five AI agent frameworks shaping today's ecosystem:\n\n1. **LangChain** – A modular framework designed for chaining language model calls, tool integrations, and workflows—perfect for building LLM-powered applications efficiently.\n\n2. **AutoGen (Microsoft)** – An open-source framework tailored for multi-agent systems. Agents coordinate via natural language and support rapid prototyping of tasks involving planners, developers, and reviewers.\n\n3. **Semantic Kernel (Microsoft)** – A lightweight, enterprise-friendly agent orchestration framework designed for embedding agents and planners—particularly suited for apps and copilots in C# or Python environments\n\n4. **OpenAI Agents SDK (Swarm)** – A minimalist, production-ready framework with primitives for agents, tools, handoffs, and guardrails—all optimized for OpenAI models.\n\n5. **CrewAI** – A role-based orchestration framework treating agents as a collaborative crew (e.g., planner, critic, coder), with structured pipelines and strong LangChain compatibility.\n\n  **Bonus Mention**: - **Atomic Agents** simplifies multi-agent systems via a decentralized, open-source approach.\n  - **AutoGPT** enables goal-driven autonomous behavior by breaking tasks into subtasks—but beware of loop risk and hallucinations.\n\n**Suggested Transitions:**\n- “First up, LangChain—your go-to for chaining LLMs and tools.”\n- “Next, let’s explore how Microsoft’s AutoGen builds conversational teams of agents.”\n- “From there, Semantic Kernel brings agents closer to enterprise apps.”\n- “Now, if you want something streamlined and robust, the OpenAI Agents SDK may be your fit.”\n- “Finally, CrewAI helps you orchestrate role-based workflows with ease.”\n\n## Relevant Resources CTA [XX:XX–XX:XX]\nWant to dig deeper? I’ll link documentation and example demos for each framework in the description—so you can explore hands-on.\n\n## Feedback Request CTA [XX:XX–XX:XX]\nWhich framework are you most interested in testing—or already using? Let me know in the comments below, and we’d love to help with code samples or starter guides.\n\n## Outro [Last 15–20 sec]\nThanks for watching! If you found this helpful, hit like and subscribe for more AI tool and framework breakdowns. Until next time—keep building smart agents!\n\n---\n\n**Additional Resource**:  \nGrab more video script templates and AI framework walkthroughs at https://infrasity.com/tools/ai-script-generator/templates."
// },
// {
//   "id": 15,
//   "videoType": "Demo Comparison",
//   "title": "AI Reviewer Comparison Demo",
//   "intro": "Welcome! In this video, we’ll demo and compare top AI-powered code review tools to help you choose the best fit for your development workflow.",
//   "duration": "6 min",
//   "author": "[Author or Presenter Name]",
//   "category": "DevTools",
//   "content": "# AI Reviewer Comparison Demo Script\n\n## Hook [00:00–00:15]\nTired of tedious PR reviews? In today’s video, we’ll demo how leading AI reviewers—like Greptile, Qodo Merge, CodeAnt, and Bugdar—streamline feedback, boost code quality, and save devs hours.\n\nLet’s get started!\n\n## Intro B-roll or Logo [00:15–00:20]\n[Logo animation or dynamic visuals showing code diff, AI review comments, and highlights on problematic lines.] \n\n## Greetings [00:20–00:35]\nHey, everyone! Welcome to our AI Reviewer Showdown. I’m excited to walk you through live demos of several AI code review tools—showcasing their strengths, weaknesses, and ideal use cases.\n\n## Content Body [00:35–XX:XX]\nWe’ll evaluate four standout AI reviewers across real pull requests:\n\n1. **Greptile** – Provides deep, full codebase analysis, not just diffs, with in-line comments and natural language summaries. Teams merge PRs up to 4x faster and catch 3x more bugs using it.\n\n2. **Qodo Merge** – Formerly Codium, integrates with IDEs and Chrome for PR reviews, supports GPT family models, Claude Sonnet, and proprietary ones. Delivers chat-based code feedback.\n\n3. **CodeAnt AI** – Cuts review time and bug rates by over 50%, tackling the rising complexity of AI-generated code\n\n4. **Bugdar** – An academic LLM-powered reviewer built for secure, context-aware PR analysis. Processes reviews in under a minute across many languages, including Rust and Python.\n\n**Live Demo Flow:**\n- Upload or open a sample PR.\n- Run each tool and capture its comments, suggestions, and summaries.\n- Showside-by-side comparison of highlights: clarity of feedback, accuracy, context awareness, security insights.\n\n**Quick Comparison Table (spoken):**\n- Greptile: full-base depth, fast bug detection.\n- Qodo Merge: IDE-friendly with chat feedback and model flexibility.\n- CodeAnt AI: efficiency for AI-generated code—less manual fuss.\n- Bugdar: secure, RAG-augmented, context tailored analysis.\n\n**Transitions:**\n- “First, let’s see how Greptile analyzes the entire codebase.”\n- “Switching to Qodo Merge—note how feedback pops up right inside your PR or IDE.”\n- “Now, watch how CodeAnt handles an AI-generated snippet—its turnaround is impressive.”\n- “Finally, check out Bugdar’s security lens and how fast it returns feedback.”\n\n## Relevant Resources CTA [XX:XX–XX:XX]\nWant to explore further? I’ll link tutorials and documentation for setting up Greptile, Qodo Merge, CodeAnt AI, and Bugdar in the description below.\n\n## Feedback Request CTA [XX:XX–XX:XX]\nLet me know which tool impressed you the most—or if you’d like help integrating one into your stack! Drop a comment or join our community chat.\n\n## Outro [Last 15–20 sec]\nThanks for watching this AI Reviewer comparison. If this helped you level up your review process, like and subscribe for more in-depth dev tool demos. Happy coding—and see you next time!\n\n---\n\n**Additional Resource**:  \nExplore more video script templates and deep-dive demos at https://infrasity.com/tools/ai-script-generator/templates."
// },
// {
//   "id": 16,
//   "videoType": "Analysis",
//   "title": "Do They Catch Real Bugs?",
//   "intro": "Ever wondered if AI-powered code review tools can really catch real bugs—and how well they perform compared to human reviewers? Let’s find out!",
//   "duration": "5 min",
//   "author": "[Author or Presenter Name]",
//   "category": "Technology",
//   "content": "# Do They Catch Real Bugs? Script\n\n## Hook [00:00–00:15]\nAre AI code reviewers all talk, or do they actually uncover real-world bugs? In this video, we'll test whether these tools deliver on their promises—and how developers feel about them.\n\nLet’s see what’s real—and what’s hype.\n\n## Intro B-roll or Logo [00:15–00:20]\n[Logo animation followed by a split-screen showing AI tools scanning code and bug icons popping up.] \n\n## Greetings [00:20–00:35]\nHi everyone! Welcome to our showdown where we ask: Do AI code reviewers actually catch real bugs, and can we trust them? I’ll walk you through data, developer feedback, and real stats from the field.\n\n## Content Body [00:35–XX:XX]\nHere’s what we’ll cover:\n\n### 1. Real-World Impact\n- One team shared that using **Greptile** reduced their time-to-merge from ~14 hours down to just ~3. “It does a great job catching meaningful bugs,” they wrote, “[without] adding verbose comments.”\n- In a benchmark, **Greptile caught 82% of test issues**, outperforming **CodeRabbit**, which caught only 44%.\n- **CodeAnt AI** slashed bug incidence by over **50%** and significantly cut manual review time\n\n### 2. Security & Vulnerability Detection\n- Tools like **DeepCode (Snyk)** automate bug, vulnerability, and performance issue detection across languages, often earlier than manual review.\n- GitHub highlights that AI can identify subtle, context-based security vulnerabilities—like flawed authentication or input validation—often before code reaches production.\n- In academia, **Bugdar** (an AI-Augmented code reviewer) processes PRs in under a minute and offers context-aware vulnerability feedback.\n\n### 3. Skepticism & Limitations\n- Critics note that many AI tools are often just fancy wrappers around static linters. Real gains might just be perceived rather than actual.\n- On Reddit, a user shared: \n  > “Automated AI review can find bad patterns… but it struggles with domain-specific logic.”\n- A rigorous study of an AI-based vulnerability fixer found high false positive rates and non-actionable suggestions, signaling that these tools still need refinement.\n\n**Transitions Suggestions:**\n- “First, let’s look at performance numbers—do they actually catch bugs?”\n- “Next, how well do they handle security vulnerabilities and context?”\n- “Finally, what are developers saying—are there cases where AI falls short?”\n\n## Relevant Resources CTA [XX:XX–XX:XX]\nWant to explore more? I’ll include links below to benchmarks for Greptile, comparisons like CodeRabbit vs Greptile, CodeAnt’s results, and academic studies like Bugdar and DeepVulGuard.\n\n## Feedback Request CTA [XX:XX–XX:XX]\nHave you used AI code reviewers? Did they catch real bugs for you—or miss the mark? Share your experiences in the comments or join our developer community to discuss.\n\n## Outro [Last 15–20 sec]\nThanks for watching! If you found this helpful, like and subscribe for more honest tools breakdowns. Until next time—keep coding smart and safe!\n\n---\n\n**Additional Resource**:  \nFind more AI tool comparisons and script templates at https://infrasity.com/tools/ai-script-generator/templates."
// },
// {
//   "id": 17,
//   "videoType": "Secure Code Review",
//   "title": "Security-Focused Code Review",
//   "intro": "In this video, we’ll explore how AI-powered tools and systems are transforming security-focused code review—highlighting top solutions, emerging approaches, and best practices to keep your code safe.",
//   "duration": "6 min",
//   "author": "[Author or Presenter Name]",
//   "category": "Cybersecurity",
//   "content": "# Security-Focused Code Review Script\n\n## Hook [00:00–00:15]\nImagine if your code was guarded by intelligent systems—and catches vulnerabilities before a human even types a review. That’s where security-focused AI code review steps in.\n\nReady to secure your software pipeline? Let’s dive in.\n\n## Intro B-roll or Logo [00:15–00:20]\n[Logo animation or visuals of code scans with threat alerts, AI agents flagging lines, and secure badges appearing.] \n\n## Greetings [00:20–00:35]\nHi everyone! Today, we’ll spotlight AI and automation tools that elevate code security—examining tools that detect vulnerabilities, guard against AI risks, and even outsmart hackers using agents.\n\n## Content Body [00:35–XX:XX]\nHere’s what we’ll cover:\n\n### 1. Proven Static Analysis Tools\n- **Snyk (DeepCode AI)** offers 80%-accurate security autofixes, supports multiple languages, and prioritizes vulnerability resolution.  - **Semgrep** is an open-source static analysis platform ideal for SAST, secrets scanning, and custom rule definitions—used in security workflows across 30+ languages.  - **SonarQube** provides continuous code inspection with built-in security rules and integrates with CI and IDE environments. - Other notable platforms: **Codacy**, **Checkmarx**, **CodeQL**, **Coverity**, **CodeSonar**, **FindBugs/SpotBugs** for deep security scanning and code quality checks. \n\n### 2. AI-Augmented & Agentic Security Review\n- **Bugdar** integrates into GitHub PRs and delivers contextual, real-time vulnerability analysis with LLMs and RAG support, often under 60 seconds per PR. \n- **Endor Labs’ AI Security Code Review** uses specialized agents, security tooling, memory, and code knowledge to deliver scalable, precise analysis. \n- **LlamaFirewall** offers guardrails for AI agents—covering jailbreak detection, reasoning audits, and static analysis to prevent insecure code generation. \n\n### 3. AI as Offensive Security—Why This Matters\n- Recent research shows AI models—including OpenAI, Anthropic’s Claude, and more—can automatically discover new zero-day vulnerabilities (17 discovered in 188 codebases), although they locate only ~2% of all vulnerabilities. \n- Anthropic’s AI model Claude even outperformed human teams in hacking competitions like PicoCTF and Hack the Box, underscoring the need for equally powerful defensive tools. \n\n### 4. Risks & Real-World Incidents\n- A recent incident demonstrated how a malicious prompt embedded into Amazon’s AI coding assistant could have triggered destructive commands—highlighting the danger of over-trusting AI-generated code. \n\n**Suggested Transitions:**\n- “Let’s start with proven static analysis platforms familiar to many developers.”\n- “Now, watch how AI agents like Bugdar augment traditional tools with conversational insights.”\n- “Next, see how AI can both defend—and attack—revealing the dual-edged nature of the tech.”\n- “Finally, let’s talk about real risks and how to guard against them.”\n\n## Relevant Resources CTA [XX:XX–XX:XX]\nWant to explore? I’ll link DeepCode (Snyk), Semgrep, SonarQube docs, Bugdar, Endor Labs’ AI Security Review, LlamaFirewall, plus academic benchmarks in the description.\n\n## Feedback Request CTA [XX:XX–XX:XX]\nWhat’s your current security review setup, and where could AI help—or harm—you? Share your experiences or community tips in the comments below!\n\n## Outro [Last 15–20 sec]\nThanks for watching! If you found this helpful, please like and subscribe for more on securing AI and code tools. Stay safe, stay secure—and see you next time.\n\n---\n\n**Additional Resource**:  \nCheck out our AI agent and security tooling script templates at https://infrasity.com/tools/ai-script-generator/templates."
// },
// {
//   "id": 18,
//   "videoType": "Explainer",
//   "title": "AI Reviewer vs Linter Explainer",
//   "intro": "In this video, we’ll demystify the differences between traditional linters and AI code reviewers—what they catch, where they fall short, and how they complement each other.",
//   "duration": "5 min",
//   "author": "[Author or Presenter Name]",
//   "category": "Technology",
//   "content": "# AI Reviewer vs Linter Explainer Script\n\n## Hook [00:00–00:15]\nWhat happens when a smart AI assistant and a classic linter go head-to-head on your code? Let’s break down what each one can—and can't—catch when keeping your code clean and reliable.\n\nReady? Let’s compare.\n\n## Intro B-roll or Logo [00:15–00:20]\n[Logo animation followed by visuals showing a linter flag icon transforming into an AI brain or agent inspecting code.] \n\n## Greetings [00:20–00:35]\nHey everyone! Today we’re unpacking the key differences between linters and AI-powered reviewers—showing you what each excels at and how they fit into modern development.\n\n## Content Body [00:35–XX:XX]\n### 1. What is a Linter?\nA linter is a static analysis tool that scans your code **without running it**, flagging syntax errors, style violations, type mismatches, and potential bugs. They enforce coding conventions and help maintain clean code across teams. \n\n### 2. What Is an AI Code Reviewer?\nAI reviewers leverage machine learning and language models to analyze code more intelligently—spotting semantic bugs, offering suggestions, even auto-fixing issues. They can understand context, intent, and repository-wide patterns. \n\n### 3. Key Differences\n| Feature              | Linter                                 | AI Reviewer                                                   |\n|----------------------|-----------------------------------------|----------------------------------------------------------------|\n| Scope                | Syntax, style, simple rules             | Deeper logic, semantics, context-aware checks                   |\n| Context awareness    | Minimal                                 | Rich context across codebase and patterns                       |\n| Feedback style       | Rule-based warnings                     | Natural language suggestions, reasoning                         |\n| False positives      | Often high, noise-prone                 | Reduced, more nuanced—though still imperfect |\n\n### 4. Why Use Both Together?\n- **Linters** catch standard issues immediately as you code. \n- **AI reviewers** analyze subtler smells, inefficiencies, or design missteps across code contexts. \n- Combined, they streamline mundane fixes and let human reviewers focus on architecture, logic, and mentorship. \n\n### 5. Caveats & Human Oversight\n- AI reviewers aren’t perfect—they can add noise or redundant comments, and may increase PR time. \n- And neither replaces human insight: humans catch architectural flaws, domain-specific logic, and share knowledge—something AI can’t replicate. \n\n## Transitions Suggestions:\n- “First, let’s define what linters are and how they help.”\n- “Now, contrast that with what AI-powered reviewers bring to the table.”\n- “Let’s lay that out in a clear comparison.”\n- “Here’s how combining both tools gives you a smoother workflow.”\n- “Finally, we’ll close with why human insight remains irreplaceable.”\n\n## Relevant Resources CTA [XX:XX–XX:XX]\nWant to explore further? I’ll link articles on linting, AI reviews, and academic studies in the description below.\n\n## Feedback Request CTA [XX:XX–XX:XX]\nWhich tool do you rely on in your workflow—linting, AI review, or both? Share your experiences in the comments or join our community to compare toolchains.\n\n## Outro [Last 15–20 sec]\nThanks for watching! If this helped clarify the difference, hit like and subscribe for more insightful comparisons. Code smart, and see you next time!\n\n---\n\n**Additional Resource**:\nCheck out more explainer scripts and developer tool guides at https://infrasity.com/tools/ai-script-generator/templates."
// }







];

export default ScriptData;
