---
title: Your code might not be as valuable as you think
date: 2026-09-02
description: A reflection on what makes software valuable when producing code becomes increasingly cheap.
layout: post
tags:
    - AI
    - Future
    - Refactoring
    - Programming
    - Ai assisted writing
aiAssisted: true
---

# I Don’t Care About Your Legacy Reasons

I don’t care why your product has to work this way.

I don’t care that the architecture was decided eight years ago.

I don’t care that changing this component would require touching three services nobody wants to touch.

I don’t care that the person who wrote it left the company.

And your users definitely don’t care.

For years, “legacy” has been a surprisingly effective competitive advantage. \
A new competitor might see an obviously better way to build something, but actually building it meant months of engineering work. \
That barrier is disappearing.

> AI is here.

If I can understand your product today and build a better version of an important part of it tomorrow, **your ten-year-old codebase isn't a moat**.

## Code Is Becoming Cheap

Not worthless. Cheap.

Good engineering still matters: architecture, security, testing, operations, and knowing when an AI-generated solution is complete garbage. But the cost of producing software is falling quickly. Work that once occupied a small team for several weeks can increasingly be prototyped by one developer in a day.

That changes what matters.

Imagine two companies.

Company A has:

* 10 years of code
* hundreds of thousands of lines
* dozens of old architectural decisions
* compatibility layers nobody fully understands
* a six-month roadmap to change a core workflow

Company B has:

* one developer
* modern tooling
* AI
* a clear understanding of what customers actually need

Company A might still win.

But not because it has more code.

## Your Tickets Are More Valuable Than Your Code

The interesting asset inside an old software company isn't necessarily the repository.

It may be the history hidden around it:

* the weird customer request from 2019
* a bug triggered by CSV files from one specific version of SAP
* an enterprise customer's unusual permission model
* the obvious feature that broke three unrelated workflows
* a support ticket explaining why a seemingly useless checkbox exists
* the incident that led to a particular validation rule
* a rejected feature request that finally exposed the real business constraint

That information is incredibly valuable.

Because it represents something much harder to generate than code:

**understanding.**

Your Jira might contain more of your competitive advantage than your Git repository. Tickets preserve product knowledge, bug reports reveal edge cases, and support conversations show how people actually use the product. Architectural decisions record constraints; failed experiments tell you what *not* to build.

Historically, that knowledge eventually turned into code.

So we started treating the code as the asset.

But AI changes that equation.

As implementation gets cheaper, the knowledge guiding it becomes more important.

## The Future Competitor Might Clone Your Lessons, Not Your Code

Imagine giving an AI system:

* ten years of tickets
* customer conversations
* bug reports
* product decisions
* incident reports
* documentation
* feature requests
* telemetry
* rejected ideas

Then asking:

> Build the product again, knowing everything we know now.

That is a much more interesting question than:

> Rewrite this codebase.

The first removes years of accumulated technical baggage while preserving years of product knowledge. That's powerful—and slightly terrifying if you're running an established software company. Your biggest advantage may no longer be that rebuilding your product would take five years.

It might take five months, five weeks, or five days.

For some products, we're already getting dangerously close to that last one.

## “But You Don't Understand Why It Works Like This”

Exactly.

That's the problem.

If an important constraint exists only inside the codebase—or inside the head of someone who has worked there for twelve years—you don't have a moat. You have undocumented archaeology.

If something must behave strangely for a legitimate reason, capture it:

* put it in the ticket
* document the customer requirement
* record the regulatory constraint
* explain the failure mode
* preserve the decision

Because “that's just how the system works” is becoming less defensible every year.

A competitor doesn't have to carry your architecture forward. They only need to reproduce the useful behavior, and now they have machines that are getting extremely good at doing exactly that.

## Your Moat Is Moving Up the Stack

The moat used to be:

> **We spent ten years building this software.**

Increasingly, the moat needs to become:

> **We spent ten years learning this problem.**

Those are very different things. The first is vulnerable to cheaper implementation; the second compounds.

So preserve the knowledge. Clean up your tickets, explain why decisions were made, and connect support requests to product requirements. Capture failed experiments and weird edge cases. Treat product history like training data for your future company.

AI can write another codebase. It can't magically recreate ten years of lessons you never wrote down.

**The value isn't in how much code you've accumulated.**

**The value is in everything you learned while writing it.**
