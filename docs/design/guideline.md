# General guidelines

At automatic, we <3 static sites. They are fast, fun to write, and easy to maintain. 

But after we made a handful of them, we found that we were re-inventing the build system of each project.  
The tools and process we chose were arbitrary and needlessly fragmented. 
Any enhancement or bug fixes to a particular project's build system couldn't be easily ported to others. 
To solve these sore points, we created this boilerplate so that all projects adhere to the same tools and share the same process. 

As we see new and exciting tools and framework crop up, we expect this project to continue to evolve to keep up with the pace.
There will be times when we need to incorporate new dependencies or swap out existing ones. 
Here are some guiding principles for making those changes.

## Build tool and framework agnostic

Npm vs Bower. Gulp/Browserify vs Webpack. Angular vs React. Tools, frameworks, libraries will come and go. Today's standard practices will certainly not be tomorrow's. 

This boilerplate should not be closely coupled to a particular build tool or framework, because chances are it will be outdated in 6 months. 

## Simple tools and components

Whenever we introduce a dependency to the boilerplate, we should always pick tools and frameworks that are genuinely and objectively simple. 

A build system that's composed of simpler and modular components will be easier to maintain because parts of the system can later be replaced with alternatives. 

## Construct vs Artifact

Because we have a myriad of tools, language, and frameworks to construct our sites from, it's easy to forget that the output/artifact of our system is just plain HTML, Javascript, and CSS.

At the end of the day users don't stare at our source code and marvel at how pleasant it is. They interact with the interface rendered via HTML, Javascript, and CSS in the output bundle.

Any enhancement to the attributes of the artifact should be prioritized over enhancement to the construct. In other words, process that noticeably enhance the user experience of our sites and apps should be prioritized over developer ergonomics.
