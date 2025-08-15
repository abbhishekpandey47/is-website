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
    title: "Sofware Demo Video Script",
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
{
    "id": 9,
    "videoType": "Community Introduction",
    "title": "Community Onboarding Video",
    "intro": "You made it to the [name] community! We’re so glad you made it! This video will quickly show you the ropes of our [community].",
    "duration": "3 min",
    "author": "[Author or Presenter Name]",
    "category": "Education",
    "content": `# Welcome to the [Name] Community: Get Started Guide Video Script

## Hook [00:00–00:10]
You made it to the [name] community! We’re so glad you made it!  
This video will quickly show you the ropes of our [community].  

Roll the intro, please!

## Intro B-roll or Logo [00:10–00:15]
[Short logo animation or b-roll to establish branding and keep the visuals engaging.]

## Greetings [00:15–00:30]
Hey everyone, and happy [day of the week]!  
I hope you all have had a fabulous start to your day. Now let's get started on today's video.

## Content Body [00:30–XX:XX]
[Step-by-step guide to navigating the [name] community goes here, covering the following topics:]  
- Who is this for: Explain the target audience for the [name] community.  
- Relevant channels they should join: Highlight key platforms or channels for community interaction.  
- Community Guidelines: Share the rules or expectations for participation.  
- Key people in the community: Introduce important members or moderators.  
- How to make the most of this community: Provide tips for engaging and benefiting from the community.  

**Tips for building this section:**  
- Keep it simple and to the point.  
- Go through the process yourself before writing the script.  
- Consider software limitations across devices, subscription types, resolutions, etc.  
- Avoid long phrases and hard-to-understand words.  
- Be precise, assuming users are new to the [name] community.  
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
    - "We have covered [topic] in a previous video, you can find it linked below."  
    - "Hit the notification that popped up on the screen to watch a video covering [topic]."  
    - "If you are having trouble with this step, feel free to reach out to support, and we’ll get it working for you."  
    - "Speaking of [topic], we have a full course on nailing [topic] that I’ve linked in the comments below."

## Relevant Resources CTA [XX:XX–XX:XX]
If you want to know more about our community, then I recommend you check out our YouTube channel. I’ll link a few relevant videos for you in the description box below.

## Feedback Request CTA [XX:XX–XX:XX]
If you have any questions for us, hit us up on [relevant channel] or drop a comment in the box below, and someone from the team will get back to you as soon as possible.

## Outro [Last 15–20 sec]
If you made it this far, you are fantastic, and I want to thank you so much for your time.  

I hope you found this video useful, and I’m looking forward to seeing you out there.  

Sending you all good vibes. See ya!

---

**Additional Resource**:  
Get more hooks, intros, greetings, and more by accessing our database of hundreds of ideas at https://infrasity.com/tools/ai-script-generator/templates.`
}
];

export default ScriptData;
