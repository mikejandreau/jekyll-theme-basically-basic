---
layout: post
title:  "What is a Website?"
date:   2017-11-20 00:00:00 -0500
author: Mike Jandreau
categories: graphic
excerpt: The most basic definition of a website is a document. The essential function of a website is no different than that of a book, magazine, or coffee shop cork board. 
featured_image: /assets/images/2012-09-18-Abacus-Virus.png
featured_thumb: /assets/images/2012-09-18-Abacus-Virus.png
---
A website is an HTML document served on the Internet. Duh.

The most basic definition of a website is a document. The essential function of a website is no different than that of a book, magazine, or coffee shop cork board. 

The goal is to transmit an idea or message. In other words, to inform, buy,sell, and share, which often gets cluttered with unnecessary functionality.

Does the navigation need to whoosh from the top as you scroll? No. So why bother loading jQuery when you only need it for toggling one single item? It's just unnecessary.


A website, like a book, movie, or magazine, is best when presentation and substance are in balance.

Quality content ought to be presented well. Sometimes it's as simple as choosing the right typeface and featured image. Just because you CAN get fancy doesn't always mean you should. A timed transition can add subtle elegance that makes people go "ooh, aah." 

But when you get to the most basic essence of it all, it's just a document. 

So let's make a website. 

No frills, back-to-basics, a-z, from start to finish.

html lang=en
	body
		content

To begin, I have some recommended tools. These are all open-source, free programs that are accessible to anyone with a computer and an Internet connection. We will go into modifications, plugins, and advanced tasks, but for now we will just use the default settings.

Atom (text/code editor)
Modern web browser (Chrome, Firefox)





What are domains and hosting?


The car analogy is helpful.

Domain           Website            Hosting
---------------  -----------------  -----------------------
www.website.com  HTML/CSS/JS files  GoDaddy, BlueHost, etc.
license plate    engine, chassis    parking garage




Getting Started
------------

First things first - we need the tools for the job. Go to atom.io and download the appropriate version - if you use Windows, download and install the Windows version, if you use Mac, download and install the Mac version.

Create a new folder on your computer and rename it - maybe "test website" or some other name that makes sense. Open Atom and create a new document called index.html. This will be the root document of your website, and where we will get started with our HTML markup.

HTML is an acronym that stands for Hypertext Markup Language, which allows us to divide our content into headings, paragraphs, images, block quotes, and other items by using tags. Tags are HTML elements that mark the beginning and end of a particular type of content. For example, the <p> tag indicates the start a paragraph, and </p> indicates the end of a paragraph. Some tags are "self-closing," meaning they do not need the extra ending tag with the slash in it - these tags include <hr> (horizontal rule), <br> (break), and <img> (image). Image tags need a few more bits of information to work, but we'll get into that later. To begin, we'll focus on tags that need to be closed as well as opened. 

Think of it like the structure of a sentence - a sentence starts with a capital letter and ends with a punctuation mark.

Here is a sample block of HTML markup:

<h1>This is a Top-Level Heading</h1>
<p>This is a paragraph.</p>

<h2>A Second-Level Heading</h2>
<p>Here's another paragraph.</p>

That 



<img src="/file/path/to/image.jpg" alt="some text describing the image">

<a href="/link" target="_blank">link text</a>

