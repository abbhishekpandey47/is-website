## TL;DR

* The 5 Whys method is a powerful tool for Developer Experience engineers to identify the root cause of developer-facing problems.   
* Each "why" builds on the previous answer, creating a logical chain that uncovers the root cause.   
* This five whys technique is widely applicable in SaaS environments, especially for diagnosing friction in onboarding, integration, and activation.   
* It works best when used collaboratively across teams, including the Product team, Support team, and Technical Writing team.

Are you in a situation where onboarding drop-offs are rising, activation is lagging, and support tickets and calls keep coming, but there's no clear explanation for why?  

Maybe developers are signing up but not completing onboarding. Time-to-first-API-call has jumped from five minutes to twenty. You've addressed the obvious issues, but friction still lingers, and it's not clear why. When problems aren't visible on the surface, they're usually buried deeper. That's when it helps to pause and ask - Why is this happening? And keep asking, until you find the real blocker.  

The **5 Whys Method** is a straightforward technique for uncovering root causes. It's not about hitting five exactly, it's about digging deep enough to reveal what's actually holding developers back to convert or retain.  

As one Developer Experience Engineer shared in a [Reddit thread](https://www.reddit.com/r/SoftwareEngineering/comments/1h9eto0/using_5_whys_to_identify_root_causes_of_issues/):  

"***My experience has been that the 5 Whys is the nuclear option. If you use it more than a few times on most stakeholders in one requirements elicitation session, they go nuclear.***   
***"typically five times or until the underlying cause is found" My experience has been that three or sometimes four gets to the root requirement. Mileage may vary.***"  

And that's what makes it useful in developer experience work. When metrics don't tell the full story and feedback feels scattered, the 5 Whys helps you connect the dots.   

This guide covers how to apply the 5 Whys technique with an example and how to frame those five Whys.

## A Practical Example of the 5 Whys Method

Let's say you're working on a developer-focused payments API platform. Your internal metrics show a **drop in onboarding completion from 60% to 35% over the past 2 sprints**. Session replays from tools show developers **completing the quickstart**, generating an API key, and then... doing nothing. They scroll, switch tabs, and exit.  

Support tickets raise vague concerns:  
"Quickstart ran without errors, but I'm not sure what to expect next."  
"Is the API key enough? Do I need to configure OAuth too?"  

These signals confirm there's friction, but they're fragmented. To find the root cause, you apply the **5 Whys** method. 

**Problem: Only 35% of developers are completing onboarding (down from 60%)**  

### 1. Why Are Developers Dropping Off During Onboarding?

Data from session replays, onboarding funnel analytics (using Mixpanel), and support tickets show developers stop after the API key is generated. The SDK is initialized, but no API call is made, and the CLI runs silently. There are no errors, no visible results, no logs or test output.  
**Reason: Developers don't experience any immediate value or feedback.**

### 2. Why Don’t They Experience Immediate Value?

The onboarding flow is functional: install SDK, generate an API key, and run a test CLI command. But it **lacks confirmation feedback or visible outcome** - e.g., there's no "Test Transaction Created" message, sandbox receipt, or JSON response. The CLI just ends silently. The dashboard refreshes without confirmation.  
**Reason: The flow doesn't provide a clear outcome or "first success" moment.**

### 3. Why Is the Onboarding Process Unclear?

The documentation assumes a **linear, idealized path**, SDK setup → Auth → First API call. But developers often **jump around**: skipping setup steps, using curl instead of the SDK, or running the CLI out of order. If nothing breaks, they assume it worked, even when sandbox auth was misconfigured.  
The current docs don't handle these real-world patterns.  
**Reason: The onboarding experience doesn't reflect actual developer workflows or exploratory behavior.**

### 4. Why Doesn’t the Documentation Support How Developers Actually Interact With New Tools?

Despite evidence from user interviews, session replays, and repeated support tickets, docs haven't changed. Internal feedback, e.g., "devs skip token handling" or "setup feels unclear," is scattered across Slack and Notion. It never becomes scoped, actionable changes like:

* Show a JSON response after a test API call  
* Reorder steps: Auth before SDK setup  
* Add curl examples beside the SDK code  
* Show "✅ Auth Complete" after CLI setup

**Reason: DevEx insights aren't translated into specific, prioritized content or product updates.**

### 5. Why Aren’t DX Insights Being Effectively Acted On?

There's **no structured process** for handling DevEx feedback. No backlog tagging for onboarding issues, no cross-team review, and no single owner to drive changes. Feedback is either too vague ("flow is unclear") or too technical for non-dev teams ("initAuth returns null without scope param").  
This creates a disconnect: the docs team doesn't know what to revise, and product teams don't see the impact on activation or retention.  

**Reason: There's no shared framework or ownership for turning DevEx insights into prioritized, cross-team work.**  

**Solution:** To improve onboarding and activation, DevEx issues should be clearly tagged in the backlog, regularly reviewed in cross-functional triage meetings, and translated into specific, actionable tasks. Each issue must have a defined owner and timeline to ensure consistent follow-through and impact.  

**Note: This example illustrates how the 5 Whys technique can be applied in a specific context. The questions and conclusions will vary depending on the nature of the issue being investigated. These are not intended as universal questions but rather as a detailed walkthrough to help you understand the approach.**
  
Now that we've explored a full example, let's look at how you can craft effective 5 Whys as a Developer Experience Engineer.

## How to Frame the 5 Whys as a Developer Experience Engineer

Framing effective 5 Whys is pretty straightforward, but to make it meaningful in a Developer Experience context, there are a few things worth keeping in mind.  

### 1. Identify a developer-facing problem that impacts the company's growth
Focus on issues that create real friction for developers and tie directly to business outcomes, like a drop in onboarding completion, delays in the first API call, or repeated support requests during integration.  

### 2. Gather supporting evidence from developer behavior and business metrics  
Use concrete signals such as session recordings, support tickets, feedback from user interviews, and product analytics. This ensures the problem is grounded in both actual developer struggles and measurable business impact.  

### 3. Break down the problem step by step to reach its root
Start asking "why" from the surface-level issue, using each answer to drive the next question. Be specific and stay close to what developers are actually experiencing, not just what seems broken from the outside. 

### 4. Go deeper until you reach a systemic cause  
Don't stop at isolated symptoms like "poor docs" or "low engagement." Look for patterns that point to deeper issues, like unclear responsibilities between teams and misaligned expectations.  

### 5. Validate your reasoning with cross-functional feedback  
Share your 5 Whys with teams like Product, Docs, Support, or DevRel. This helps confirm the logic, reveal blind spots, and make sure your conclusions hold up across different perspectives and responsibilities.  

### 6. Conclude when the root cause is clear and actionable  
You've gone deep enough when the root cause points to a fixable issue - something you or another team can take ownership of and address, like changing how onboarding is structured, showing clear success messages after setup steps, or clarifying confusing instructions in the developer journey.

## Conclusion

For Developer Experience engineers, the 5 Whys technique is a practical approach for getting past surface-level feedback and figuring out what's actually going wrong. It helps connect day-to-day developer friction to deeper issues in the product, process, or communication. When used thoughtfully with real data, cross-team input, and a clear focus on outcomes, it helps in analyzing the problem and finding the root cause.

Developer experience doesn't rely on the product alone - it's equally defined by the documentation, sample apps, onboarding guides, release notes, and changelogs that support it. These touchpoints often sit outside the product, but for developers, they *are* the product. At **Infrasity**, we help teams translate DevEx insights into developer-first content that actually works - from quickstarts that create momentum to changelogs that keep your users coming back.  

**Book a [Free Demo](https://www.infrasity.com/contact) with us** to see how we can elevate your developer content and turn onboarding into ongoing engagement.

## FAQs

### 1. What Is the Purpose of the Five Whys Technique?

The main purpose of the five Whys technique is to find out the root cause to a problem by asking the “Why” multiple times. Each “Why” is in line with one another, meaning every answer logically leads to the next question - creating a clear, cause-and-effect path toward the root cause.

### 2. When Should We Use the 5 Whys?

Use the 5 Whys when you encounter a problem that isn’t clearly understood or keeps recurring. It’s especially useful for issues like user drop-off during onboarding, incomplete setup flows, or low engagement with key features.

### 3. What Are Some Best Practices When Using 5 Why Analysis?

Start with a specific, real-world problem and ask “why” repeatedly, making sure each answer is grounded in actual data or developer behavior. Collaborate with those directly involved, such as engineers, product managers, support teams, or technical writers to validate each step of your analysis and ensure the root cause is accurately identified.

### 4. How Do You Do the 5 Whys Method for Big Problems?

When there’s a big problem, break it into smaller parts. Then use an Ishikawa (fishbone) diagram to identify potential causes, and run separate 5 Whys analyses for each branch to identify the root causes more effectively.

### 5. How Do I Know I’ve Found the Root Cause?

While doing 5 Whys root cause analysis, you’ve likely found the main cause when further “why” questions stop leading to new insights, and the final answer clearly explains why the problem happened and points to something you can fix.


