## Introduction

When you're building a SaaS product, shipping updates is just part of continuous product development. But here's what most teams miss: the way you communicate those updates can seriously impact engagement.

Release notes aren't just documentation - they're an effective touchpoint between your product and its users. Well-crafted product release notes have been shown to **[boost user engagement by up to 300%](https://review.content-science.com/how-atlassian-builds-trust-through-change-with-structured-release-notes/?utm_source=chatgpt.com)**. That's right! Just by clearly communicating what's new, what's fixed, and what's been improved, you can drive adoption and retention, reduce churn, and build user trust.

In this article, you'll find a comprehensive overview of product release notes - what they are, what goes into writing them, key prerequisites to keep in mind, and best practices that can make your updates truly impactful. Plus, we'll take a peek at how a product giant like Google approaches their release notes - so you can borrow a few tricks from the best.

## What Are Release Notes?

Product release notes are short, structured updates that inform users about changes made to a product, whether it's a new feature, a bug fix, or a performance enhancement. Think of them as your product's voice during every iteration - communicating progress, setting expectations, and highlighting value. They help bridge the gap between your development team and your users, making sure everyone stays on the same page.

Take HubSpot, for example. Their **[developer changelog](https://developers.hubspot.com/changelog)** keeps API users and technical teams aligned on what's changed—whether it's an updated endpoint, a new webhook, or a deprecation notice. It's a clear, reliable touchpoint that helps teams avoid surprises and adapt their integrations with confidence.

But why do users actually read product release notes? For many, release notes are the go-to resource to understand how updates affect their workflows, whether a frustrating bug they encountered is fixed or if there's a new feature that could boost their productivity. They want to know what's changed so they can make the most of your product without surprises or disruptions. 

## So, What Goes Into a Product Release Note? 

Product release notes bridge product updates with real-world usage, ensuring teams stay informed and confident as the product evolves. At Infrasity, our team of developers and technical writers has crafted release notes for over 25+ B2B SaaS startup clients - each tailored to clearly communicate what's changed, what's new, and what users need to know. 

To illustrate these best practices, I've included a release notes sample from one of our clients, Scalekit (a generative infrastructure platform), to give you clarity on how to write release notes. Below are the key components we include in every product release note to ensure users understand what's changed and how it impacts their workflow:

### 1. Title 

The title is more than just a headline; it's a navigational cue for your users. In the context of release notes, something like "May 2025" isn't just clean and concise; it helps users immediately understand which month's update they're reading.

![product release notes title](/PostImages/product-release-notes/pr2.png) 

### 2. Summary 

The summary is the hook of your release note. It highlights new features, enhancements, and bug fixes, helping busy users decide if they need to dive deeper.

For example, in the May 2025 release note from StackGen, you can see that the summary makes it clear that the update includes new capabilities (like CLI imports and Backstage integration), performance enhancements, and key fixes, all geared toward secure and scalable infrastructure management.

### 3. Version Number 

Think of the version number as a checkpoint on your product's roadmap - it gives users clarity on which iteration they're working with. Whether they're curious about what's changed since their last login or simply want to know if an issue they faced is now resolved, the version number helps them track progress, verify updates, and stay confident about their experience.

![product release notes version number](/PostImages/product-release-notes/pr3.png) 

For example, "StackGen CLI Version v0.55.0 is now available!" tells users this is the latest CLI version and that what follows applies specifically to this update. No guesswork is needed.

### 4. Detailed Changelog (What's New, Enhanced, and Fixed)

The detailed changelog is where your users get the full picture - what's been added, what's improved, and which bug has been fixed. It's more than just a list of product updates - a guide that helps users comprehend the practical impact of changes. 

Users often rely on product release notes to discover new features they can benefit from, see enhancements that streamline their workflow, and check if the bugs have been fixed. This clarity empowers users to make the most of each release.

For example, in the StackGen update, the changelog highlights enhancements to Custom Module Versioning and Governance Enforcement, showing users how they can now manage infrastructure configurations more flexibly and maintain compliance with greater ease, directly relevant for teams handling complex environments.

![product release notes detailed changelog](/PostImages/product-release-notes/pr4.png) 

In some cases, especially when addressing critical issues, you may issue patch notes outside the regular release cycle. These are short, focused changelogs that communicate urgent bug fixes. Including them in the changelog or linking to them keeps users informed and reassured that problems are being actively addressed, even between major releases.

### 5. Links to Docs

It’s important to include links to documentation and support resources in product release notes because new features or changes mostly require further explanation. For product users, these links to docs provide a quick path to deeper insights, such as integration guides, how-to articles, or troubleshooting steps. This helps them get up to speed faster, solve issues independently, and take full advantage of the new capabilities.

For example, in the StackGen update, the line "For more details, refer to the Module Editor page" points users to additional resources. This keeps the release notes concise and focused while still offering a way to explore more if needed—reducing support queries and improving the user experience.

### 6. Visuals 

For product users, visuals aren't optional; they're essential. When you introduce a new interface, feature, or workflow in release notes, a screenshot instantly help answer the users question: "What does this look like in the product?" It eliminates guesswork, reduces onboarding time, and gives users the confidence to start using the update right away.

Instead of relying solely on written descriptions, a visual grounds the change in reality. It shows the exact context - buttons, labels, and layout, so users can spot the feature as soon as they log in. This is especially useful in technical platforms where clarity and speed matter.

![product release notes visuals](/PostImages/product-release-notes/pr5.png) 

For instance, here is a screenshot of the new Resources tab that shows users exactly what to expect: a searchable, tabular view of infrastructure components with clear indicators for warnings and metadata. 

### 7. Command snippet 

For product users, especially developers, command snippets are a quick path to action. They eliminate the gap between learning about a new feature and actually utilizing it. Instead of digging through documentation or second-guessing the syntax, product users can duplicate a tested command and get started immediately.

This is especially essential in CLI-driven tools or automation-heavy workflows, where precision matters and time is limited. A well-written snippet doesn't just save effort; it builds confidence. It shows the correct usage, expected flags, and typical input, helping users avoid trial-and-error and integrate the feature smoothly into their pipeline.

![product release notes command snippet](/PostImages/product-release-notes/pr6.png) 

As you can see here, the CLI snippet makes it clear how to import a Terraform `.tfstate` file, either to create a new appStack or version an existing one. It communicates the what and the how in a single glance, accelerating adoption for infrastructure teams building compliant, automated pipelines.

### 8. Supported Resources

Not every release note needs a "Supported Resources" section, but when it's relevant, it's critical. For products that interact with cloud platforms, APIs, or infrastructure components, users need to know what's now supported to decide whether an update matters to them.

![product release notes supported resources](/PostImages/product-release-notes/pr7.png) 

In the example above, StackGen highlights newly supported standalone Google Cloud Platform (GCP) and Azure resources. Rather than crowding the note with details, it links to a full list, keeping things clean while still offering depth for those who need it.

### 9. Known Issues

If you list out known issues in product release notes, it will showcase transparency and respect for your customer's time. It will help them avoid dead ends, debug faster, and plan around limitations, especially when no fix is immediately available. This section is not about showcasing flaws; it's about building trust.

![product release notes title](/PostImages/product-release-notes/pr8.png) 

In the StackGen example, users are alerted that governance configurations may show unrelated teams due to a dropdown filtering bug. Since there's no workaround, this heads-up saves users from silent failures and confusion during setup.

## Prerequisites for Writing Effective Release Notes

Whether it's a bug fix, a new feature, or a UI enhancement, clarity starts with context. To ensure our release notes are technically accurate, user-relevant, and easy to follow, our team of developers and technical writers relies on a standardized set of details for each update. Below are the essential prerequisites you need to provide the writer for creating effective release notes:

### For Known Issues

Here are the things that are needed to write about known issues: 

- **Issue title:** A concise summary of the problem.  
- **Steps to reproduce:** A step-by-step breakdown that allows anyone to replicate the issue.  
- **Expected outcome:** What the user should experience under normal conditions.  
- **Actual issue:** What actually happens when the bug occurs.  
- **Recording or screenshot of the known issue:** Visual proof to help identify the problem faster and provide context.  
- **The necessary file to reproduce the issue:** Any test file, config, or sample input needed to replicate the bug locally or in a staging environment.  

### For New Features and Enhancements

You need to provide the following details to the technical writer for writing the new features and enhancements in the release note.

- **Feature and enhancement titles:** Clear labels that describe the update from a user perspective.  
- **Pull Request (PR) link:** A reference to the actual code change for traceability and technical accuracy.  
- **Sub-issues, if the enhancement is comprehensive:** Related tickets or sub-tasks that provide context on scope and edge cases.  
- **Figma links as an internal reference:** If the feature includes UI changes, the Figma file helps align wording with visual elements and ensures accurate descriptions. Since mockups can change over time, sharing the latest version is important. 

So, in order to get effective product release notes, you need to provide specific details, such as the issue title, steps to reproduce the issue, screenshot, Figma file, and sub-issues.

Now, let's take a look at one of the release notes examples, which shows how product giants like Google publish their product release notes.

## How Google Publishes Its Product Release Notes?

**[Google Cloud’s release notes](https://cloud.google.com/release-notes)** are a solid example of how to scale release communication without losing clarity. They publish updates daily, covering a wide ecosystem of products - from Compute Engine and Cloud Run to Vertex AI and Gemini Code Assist. Each note is clearly structured by product and includes the release status (e.g., Public Preview), a brief, actionable description, and direct links to documentation.

What makes their approach effective is the consistent use of categorical tagging. Every update is labeled to help users quickly understand what kind of change they're looking at:

- **Feature**: New capabilities added
- **Fix**: Resolved bugs
- **Known Issue**: Active problems users should be aware of
- **Announcement**: Previews or upcoming features
- **Change**: UI or behavioral modifications
- **Deprecated**: Features or workflows being phased out
- **Breaking Change**: Updates requiring user action to maintain functionality

In the **May 15, 2025**, release, Google Cloud included a well-rounded mix of updates that illustrate how to write user-focused release notes at scale. Highlights included:

- **Feature rollouts** with clear user value, like flex-start provisioning, to improve access to GPU resources for short-duration workloads.
- **UI changes** with exact console paths, helping users locate new settings without guesswork.
- **Bug fixes** that directly address known user issues are clearly described for easy verification.
- **Hardware support updates** for AI workloads, including new accelerator options like A3 Ultra and A4.
- **Announcements** are shared in advance (such as upcoming CCaaS features) so that users can plan ahead.
- **Known issues** are documented transparently, helping users avoid pitfalls and reducing support friction.

Google also publishes a weekly digest, like the one from **May 12, 2025**, where client library changes across services (e.g., BigQuery) are compiled under a section labeled "**Libraries**". These are especially useful for developers integrating SDKs or tracking breaking changes in language-specific bindings.

This kind of structure and transparency makes it easier for users to scan quickly, identify what affects them, and take action without digging through cluttered changelogs or patchy docs.

## Conclusion

Release notes play a vital role for B2B SaaS product users; they provide a clear view of what's new, what's improved, what's been fixed, and what still needs attention. From feature rollouts to known issues, they keep users in sync with your product's evolution.

A lot goes into crafting effective release notes: a clear title, detailed feature and enhancement descriptions, bug fixes, known issues, and relevant links or visuals. To write these well, your technical writer needs specific inputs, like the issue title, reproduction steps, screenshots, Figma links, and sub-issues tied to the release.

We've showcased how our developer and technical writer created release notes for one of our B2B SaaS startup clients, Scalekit, that are structured, user-focused, and easy to follow.

Need the same for your product? Book a **[Free Demo](https://www.infrasity.com/contact)** with us, and let's build it together.

## FAQs

### 1. How Do You Distribute Release Notes?

Release notes are typically distributed via in-app notifications, email updates, changelog pages, or developer portals. 

### 2. What Is the Difference Between a Change Log and Release Notes?

A changelog informs developers or technical users about changes without expecting immediate action. Product release notes, on the other hand, are designed to inform users and prompt action, like exploring a new feature or adapting to a workflow change.

### 3. How Often Should You Publish Release Notes?

Release notes should be published whenever you deploy user-facing changes, ideally with every major, minor, or patch release. Frequency depends on your release cycle, which could be daily, weekly, bi-weekly, or monthly.

### 4. Who Is Responsible for Creating Release Notes?

Typically, product managers or technical writers create release notes using input from developers. In engineering-led teams, developers may draft the notes while writers refine and format them for users.
