## **Overview**

[DevZero.io](http://DevZero.io), founded in the year 2021, quickly gained momentum in 2023\. DevZero raised [$26 million in Seed and Series A funding](https://www.finsmes.com/2023/01/devzero-raises-26m-in-seed-and-series-a-funding.html?) to support the expansion of its cloud development platform. 

Now, [DevZero](https://www.devzero.io/) is a leading cost optimization platform that cuts Kubernetes costs with autonomous live rightsizing, smarter bin packing, microVM isolation, zero‑downtime live migration, and GPU optimization. 

However, when DevZero first entered the cloud development environment market, it offered something both powerful and complex: a secure, on-demand cloud development environment built for modern engineering teams. As the product matured from devbox into a cost optimization platform, its capabilities grew exponentially, but its product documentation didn’t. As a result, developers couldn’t find a clear path to get started, deployments were inconsistent, and onboarding friction slowed down adoption.

DevZero has also earned recognition for its technical innovation and developer-focused approach. In 2024, the company launched its Developer Experience Index (DXI), along with an open-source tool called Open Development Analytics (ODA). This was to help teams closely inspect and improve developer productivity by tracking metrics like command latency, idle times, and system resource usage. These steps have positioned DevZero as a serious engine for driving engineering efficiency in modern Kubernetes environments.

This case study examines how DevZero, partnered with Infraisty, rebuilt their onboarding journey using starter templates, how to guides, and a complete overhaul of their product documentation that reflects their new positioning, which ultimately increased monthly active visitors and accelerated developer adoption.

## **Initial Challenges DevZero Faced** 

![Initial Challenges DevZero Faced](/PostImages/case-study-product-documentation/1.webp)

As DevZero continued evolving from an on-demand cloud workspace into a full-fledged cost optimization platform, challenges kept resurfacing as the developers struggled to understand how to actually use the product’s capabilities.

The challenges they faced were:

### 1. **No Quick-Start Templates**

For a platform designed to accelerate development, DevZero had yet to implement one of the most important accelerators of all: quick-start templates. Developers, then, had to build everything from scratch. They had to:

* Configure environments from scratch  
* Spend hours researching how to integrate existing apps into DevZero  
* Create projects manually

This significantly increased time-to-value and introduced unnecessary cognitive friction. For early users, especially those evaluating the product during trials.

### 2. **No How To Guides**

DevZero had powerful features but what it didn’t have were clear, actionable, end-to-end how to guides that showed users how to apply those features in real-world workflows. Developers had no guidance for tasks such as integrating DevZero with AWS, GCP, or GitHub. 

Without any structured how to guides, users were left to interpret high-level concepts with no practical next steps. 

### 3. **No Video Walkthroughs**

Modern developers expect multimodal onboarding, especially for complex platforms. Before partnering with [Infrasity](https://www.infrasity.com/), DevZero did not have any video tutorials. 

This meant new users relied solely on text-heavy docs, which amplified the learning curve. For a platform with a broad technical surface area, the absence of video content made the onboarding experience even steeper.

### 4. **No Starter Templates** 

One significant challenge DevZero faced was the **lack of starter templates**. This meant that users couldn't immediately begin working on projects. Instead, they had to spend **hours building their foundational environments** from scratch before they could start using the platform effectively.

### 5. **Core Documentation Written By Engineers**

DevZero did offer core product documentation to its users, but it had some issues. The documentations were written by engineers, had improper content flow and outdated commands. It also had:

* Structure of the overall content   
* Outdated commands  
* Unclear separation of beginner vs. advanced workflows  
* No progression path for learning DevZero from zero to expert

Much of the product documentation assumed the user already understood Kubernetes abstractions, microVM isolation, DevZero’s compute model, and environment orchestration. This assumption widened the gap between DevZero’s potential and developers’ actual understanding.

### 6. **Near-Zero Visibility in AI Search and LLM Responses**

None of DevZero’s developer content was visible on LLMs and Infrasity benchmarked their content across LLM platforms like ChatGPT, Claude, and Perplexity using new prompts. The prompts were taken from their keywords, and these are very crucial queries that their customers ask on LLMs, but they don't show up.


## CTA : Turn Your Product Documentation Into a Growth Engine

## **Why Did DevZero Collaborate With Infrasity?**

As DevZero expanded its capabilities, it became clear that the platform needed more than feature velocity. It needed a developer-first onboarding experience that matched the sophistication of the product itself. Their team of engineers had deep product knowledge, but translating that into accessible, structured, and action-driven content was a different challenge altogether.

DevZero needed a developer-first content strategy that spoke directly to engineers and accelerated product adoption. They needed a partner that understood both infrastructure and how developers think and how high-growth DevTools companies scale and Infrasity has a team of developers with deep infrastructure expertise. People who not only understand complex platforms like DevZero, but also know how to translate that understanding into clear, intuitive documentation. When the writers are developers themselves, the product becomes easier for users to understand, adopt, and trust.

This is important in order to have a relatability in what’s being done and what’s to be expected. This is why DevZero collaborated with Infrasity, and we stepped in as an extended team of engineers writing for engineers. 

The goal was to reduce the friction, accelerate the onboarding, and give DevZero’s users a clear path to value within minutes. 

What was our exact approach? Let’s take a look at the steps we implemented:

### **Infrasity’s Approach to the PainPoints of DevZero**

Although DevZero continued evolving as a full-fledged cost optimization platform, there were still issues that kept resurfacing. 

Infrasity applied the same engineering rigor we’d use for code, which was to experiment, iterate, test, and ship, so every doc, template, and video actually reduced friction for real developers. 

#### 1. **Building Practical Quick-Start Templates** 

First, we started with one of the most important accelerators of all. We created reproducible recipes for each starter, allowing users to simply “click, spin up, and run app”.

We built a to-do list, the universal learning app for API integration, state management, and basic database usage, or a Calendar app for showcasing authentication, CRUD, and simple UI flows.

This was one of the most necessary steps in order to accelerate the DevZero’s users and developers needed working examples they could fork and tinker with. Quick-start templates cut the trial time from hours to minutes and surface real platform behaviors. The goal was to save developers’ time so that they don’t have to spend hours building everything from scratch. 

#### 2. **Creating How To Guides**

The next step was creating how to Guides. Once developers had quick-starts to play with, they needed a clear path to do real work: connecting cloud services, testing integrations, and running production-like workflows. 

So, we authored complete, engineer-ready how to guides, covering the most commonly needed cloud and infrastructure patterns.

The image below is an example of the how to guides, created for:

* Cloud services such as **AWS, Azure** and **GCP**  
* Databases such as **Supabase, Neon, MongoDB**, etc  
* CI such as **GitHub Actions (Kubernetes) and (Workspace**)  
* Remote Desktop  
* Build Cache \+ Remote Execution, such as **Bazel and Docker**

**![DevZero's How-to Guides made by Infrasity](/PostImages/case-study-product-documentation/2.webp)![DevZero's How-to Guides made by Infrasity](/PostImages/case-study-product-documentation/3.webp)**  
**Example:** We developed how to guides on a real-world use case, even when the database is running inside a private VPC subnet. This guide was designed to help engineers bridge one of the most common friction points in cloud-native development, which is accessing private cloud resources from a remote development environment.

We structured the guide around two user paths: connecting to an existing DocumentDB cluster or creating a new one. This ensured that developers could jump directly into the scenario that applied to them.

The guide begins with an architecture diagram outlining the flow: **DevBox – Bastion/VPC – Private Subnet – DocumentDB Cluster**.

This immediately provides developers with a mental model of how the networking works before they execute any commands.

#### 3. **Producing Developer-Centric Video Walkthroughs**

Once we developed the needful how to guides, we also added around **20 visual walkthroughs** to them. This step was taken so that every major how to guide was paired with short, engineering-first video walkthroughs.

How we approached video:

* Terminal-first recording, showing every command run in real time  
* Step-by-step execution of the same instructions developers see in the docs  
* Full-length walkthroughs for deeper workflows

**Example:** Infrasity [produced developer-focused videos](https://www.infrasity.com/services/tech-video-production) for how to guides such as [RDS (Relational Database Service)](https://www.devzero.io/docs/how-to-guides/cloud-services/aws/connect-to-an-rds-instance), [ElastiCashe](https://www.devzero.io/docs/how-to-guides/cloud-services/aws/connect-to-elasticache), etc. The image below shows how the videos are linked to each how to guide so it’s easier for developers to understand and implement. 

![Examples of Video Walkthrough made by Infrasity](/PostImages/case-study-product-documentation/4.webp)

![Examples of Video Walkthrough made by Infrasity](/PostImages/case-study-product-documentation/5.webp)

![DevZero's video walkthrough by Infrasity](/PostImages/case-study-product-documentation/6.webp)

Many DevZero users are visual learners and seeing the workflow allows them to accelerate smoothly. This also decreased repeated support tickets, because developers could troubleshoot by rewatching specific steps.

With these walkthrough videos, DevZero finally had a multi-format learning experience: text \+ diagrams \+ code \+ real execution.

#### 4. **Introducing Starter Templates** 

While quick-starts teach the basics, a team of engineers also need production-aligned templates they can standardize across projects. This is why the introduction of [starter templates](https://www.devzero.io/docs/starter-templates) was important.

Starter templates are important as they reduce complexity, enforce consistency, and instantly give the teams reproducible environments that reflect their real stack and, most importantly, this is time time-efficient. DevZero had yet to have starter templates for users, so we introduced templates covering major categories such as:  
![DevZero's starter templates by Infrasity](/PostImages/case-study-product-documentation/7.webp) 
The above image shows the starter templates made by Infraisty for all the major categories.

* **Language Templates:** Rust, CS, C, Cpp, Dart, Go, Java, JavaScript, Python, Ruby, etc  
* **Build Tool Templates:** Bazel, Docker, and Nix  
* **Database Tool Templates:** Supabase Baserow, MongoDB, NocoDB, and Postgres  
* **CI/CD Templates:** GitHub Actions, Argo CD, Automatisch, Bazel Buildfarm, and Gitea  
* **Infrastructure Tool Templates:** Dokku, Helm, Fonoster, Kubectx \+ Kubens, K9S, Langfuse, Terraform CLI, etc.

For example, the Dokku Starter Template**,** where we developed a complete recipe that:

* Installed Dokku using Docker  
* Configured system prerequisites  
* Enabled Docker services within the DevZero environment  
* Deployed Dokku in a way that allowed teams to push apps instantly

This made it easier for developers from any organization to use similar environments and use these starter templates.

#### 6. **Establishing Structured, Developer-Ready Documentation**

Infrasity’s final step was to rebuild DevZero’s core documentation structure to a clearer developer journey. Prior to partnering with Infraisty, DevZero had yet to have any structured documentation for new users. 

We updated all the core documentation and also updated the outdated commands. We improved the overall structure and content flow of the [core documentations](https://www.devzero.io/docs/platform) as those were written by engineers, which made the content extremely dense. 

This turned DevZero’s core documentation from informative but dense, engineer-written notes into a polished, developer-first knowledge system that supported fast onboarding, reduced friction, and encouraged deeper exploration of the platform.

Infrasity also strengthened one of DevZero’s Recipes. Before our involvement, Recipes had brief descriptions but no real guidance on how to create them, customize them, or use them to their full potential. Developers didn’t understand how Recipes could be cloned, shared across teams, or used to standardize environments. 

To fix this, Infrasity produced clear, example-driven documentation that showed how to modify existing ones, and how they fit into real workflows. This clarity finally allowed users to treat Recipes as powerful, reusable building blocks. The image below shows the updated Recipes that are easy for developers to follow.

![DevZero's updated recipes by Infrasity](/PostImages/case-study-product-documentation/8.webp)

#### 7. **Building AI Search Visibility from Zero**

After addressing the documentation foundation, Infrasity executed a full AEO strategy for DevZero. The goal was to be the answer that AI models surface when a buyer asks, for example, "What's the best Kubernetes cost optimization platform?" 

Here is how Infrasity executed each part of the plan, but before starting, we made an AEO checklist for content to make sure the developer content ends up being cited and visible on LLMs. Once we had the checklist, we:

##### 7.1 **Restructure Existing Blogs for LLM Extraction:**

DevZero’s existing blogs had the same problems across three areas:

* Data & structure: No FAQ sections or QAPage schema markup, no structured spec tables or product attribute markup, titles too long and not front-loaded with primary keywords, or no internal links to product pages

* Content quality gaps: Features listed without user benefits or differentiating attributes, no first-hand usage or low E-E-A-T signals, images missing descriptive file names and keyword-relevant ALT text, and factual claims made without credible sources cited

* SEO & technical gaps: No single primary keyword is aligned across the title tag, H1, and body; URL structures are sub-optimal, and no competitor content gap analysis has been done.

Changes made across every blog were:

* One primary keyword assigned per post, integrated into the title tag, H1, and the body
* URLs cleaned up to be semantic and keyword-inclusive
* Headings rewritten around search intent
* TL;DR summaries added to every post
* Comparison tables inserted
* FAQ sections added with QAPage schema markup
* Product spec table(s) added with structured data markup
* Internal links added to relevant product and feature pages
* Feature-focused sections rewritten to lead with user benefits and differentiating attributes
* Generic sections replaced with first-hand product usage, benchmarks, and real screenshots, hence addressing E-E-A-T
* All factual claims sourced and cited from credible external references
* Image ALT text rewritten with descriptive, keyword-relevant attributes
* Competitor content gap analysis run for each post to ensure full topical coverage

##### 7.2 **Adding New Prompts to Existing Content**

New prompts were incorporated into the existing content’s FAQ section as new FAQ, as H2s, or in the content for LLM visibility. The performance of the incorporated prompts can be seen on [app.infrasity](https://app.infrasity.com/), which allows you to understand which prompt is driving results and which is not.

#### 8. **Created New SEO Optimized Landing Pages**

DevZero's website had outdated messaging that no longer reflected the product, which is why Infrasity rewrote the messaging, redesigned the UI/UX, and built five SEO-optimized landing pages, which are the homepage, Kubernetes cost optimization, cost monitoring, GPU optimization, and blog, as shown in the image below. 

Each page was built around a dedicated target keyword, with keyword-aligned H1s, meta titles, meta descriptions, internal linking, FAQ schema markup, embedded case studies, and a clear how-it-works flow.

## CTA : Turn Your Product Documentation Into a Growth Engine

## **When Founders Talk: Infrasity X DevZero**

[![Watch the video](/PostImages/case-study-product-documentation/video.webp)](https://www.youtube.com/watch?v=GTMEKQIM84I)

In a featured [video conversation,](https://www.youtube.com/watch?v=GTMEKQIM84I) Shantanu, Founder of Infrasity and Debosmit Ray, Co-founder & CEO of DevZero, explored the deeper engineering problems DevZero solves, ranging from the limitations of traditional development environments to the evolving role of platform engineering, SRE, and DevOps.

The discussion also highlighted how DevZero integrates with major cloud providers like AWS, Azure, and DigitalOcean, and the value it delivers to both developers and engineering leaders. 

This session helped position DevZero not just as a product but as a forward-thinking voice in the cloud-native and developer infrastructure space, strengthening brand credibility and increasing awareness among engineering teams evaluating modern development platforms.

## **Did Anything Change?**

Yes, the collaboration between DevZero and Infrasity resulted in a complete transformation of the platform’s developer onboarding experience. Infrasity’s approach to the pain points faced by DevZero resulted in:

* Faster developer onboarding  
* Increased developer engagement and increased 14.57% in active users from 7,367 to 8,440 visitors
* Comparatively fewer onboarding support tickets  
* Increased engagement with templates in the span of 3 months.

Looking for similar results for your DevTools or B2B SaaS platform?

Book a [free demo](https://www.infrasity.com/book-a-demo) with Infrasity to explore how we can help you improve your documentation, developer experience, and onboarding, just like we did for DevZero.
