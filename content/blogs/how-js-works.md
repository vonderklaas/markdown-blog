---
title: Behind complex JS apps
description: Take a look behind curtains of JS apps
author: Nick Garbalau
authorImage: https://avatars.githubusercontent.com/u/53371076?v=4
coverImage: https://miro.medium.com/max/1400/1*LyZcwuLWv2FArOumCxobpA.png
date: '17 Feb 2023'
---

&nbsp;

# Behind complex JS apps

## Prelude

I have some experience with the technologies that I will be covering in this article, but I still think
that a much deeper understanding of all the things that I will write about is needed to really
understand the mechanism of how JS works under the hood. Anyway, I recommend that you think
of this article more as arranging shapes and creating common points, and if you are especially
interested in diving into some component or technology, you can do it yourself after reading the
article. In no way do I claim authority or a special opinion, I am a developer like everyone else, and
making mistakes in our profession is normal, this is an opportunity to grow. If you disagree or want
to add something to this text, please - do it, because after all, we are here to learn. Happy reading.

## Overview

JavaScript, often abbreviated as JS, is a programming language that is one of the core
technologies of the World Wide Web, alongside HTML and CSS. [As of 2022, 98%](https://en.wikipedia.org/wiki/JavaScript#:~:text=As%20of%202022%2C%2098%25%20of,the%20code%20on%20users'%20devices.) of websites
use JS on the client-side for page behavior, often incorporating third-party libraries
and packages. JS is a high-level and single-threaded programming language. When we refer to a
programming language as high-level, we mean that it has a high level of abstraction. As a result, it
improves human understanding of the code but if rises far above the machine code. JS
has a blocking and synchronous nature, it means that the code runs in the order it appears, and
each section of code must complete running before moving on to the next one.

However, it is still
possible to execute code asynchronously and without blocking the thread, you will see it a bit
later in the article, bear with me.

Also, as you may or not heard before, JS is an interpreted programming language. It means
that your source code is not compiled into binary code prior to execution. Well, but how your
computer can understand what to do with a plain text? That is the job for a JS engine.

## Engine

JS engine is simply a computer program that execute JS code. JavaScript engines
are embeded in all the modern browsers today. When the JS file is loaded in the browser,
engine will parse the code line by line, convert it into machine code and then execute it. The key
difference of JS, is that an interpreted language does not require compilation into binary
code before execution.

I am not going into full details, because engine can be quite complicated and to describe all
of it contents is hardly possible in article of this type. However, I can mention that it performs a
lexical analysis, breaking down the source into a series of tokens, and convert it into fast,
optimized code that can be interpreted by a browser.

[Chrome `V8` engine](https://`v8`.dev/), made by Google is written in C++. It also compiles and executes JS
source code, handles memory allocation and collects garbage. `V8` was first designed to increase
the performance of JS execution inside web browsers. In order to obtain speed, `V8`
translates JS code into more efficient machine code instead of using an interpreter. It
compiles JS code into machine code at execution by implementing a JIT (Just in Time)
compiler like a lot of modern JS engines do such as [SpiderMonkey](https://spidermonkey.dev/) or [Rhino](<https://en.wikipedia.org/wiki/Rhino_(JavaScript_engine)>).

The main difference here is that `V8` doesn’t produce bytecode or any intermediate code.
One benefit of this method is that it makes the JS platform independent, enabling it to run
on any platform or operating system. All current Internet browsers include some of the JS
engine by default. However, in this article I will stick to Chrome’s `V8`, for simplicity and also becase
the same engine is in the core of Node.js. Nevertheless you can suppose that other engines work
quite the same, but I'm not an expert here. Alright, now let's see how the JS engine works. `V8` engine or to put it better `V8`
environment consists of two main parts: [Heap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop#heap) and [Call Stack](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop#stack).

![`V8`](https://user-images.githubusercontent.com/53371076/219686034-ace2a2ef-483f-44a6-ba41-4ced57b40e94.png)

### Heap

Heap is an unstructured memory pool that houses the objects our program needs. This is where
`V8` stores objects or dynamic data. This is the biggest block of memory area and this is
where [garbage collection takes place](https://dev.to/jennieji/memory-management-in-`v8`-garbage-collection-and-improvements-18e6). But our code runs on a call stack.

### Call Stack

As I already mentioned, JS can only do one operation at a time since it is a single-threaded
programming language with a single call stack. The call stack is a program that keeps track of our
position inside it, or to put in another words, call stack tracks where are we in the application’s
state.

If we step into a function, that function will be pushed to the top of the stack and if we return
from a function, that function will be popped off from the top of the stack.
Take a look at this code snippet:

![Functions](https://user-images.githubusercontent.com/53371076/219686050-684669cf-fe82-4ec4-bbd9-93bbb8517ff2.png)

If you take this code and run it browser console for example, you will see this error:

![Error](https://user-images.githubusercontent.com/53371076/219686054-ab3c28e1-58f7-4a22-a5f7-b777120c91ac.png)

As you see, when JS throws an error, it also prints the call stack, so it is very informative
example to see call stack visually. You can see how JS stacked our function calls on top of
each other, like history of steps. JS single stack is what makes JS single threaded.

A thread represents how many parts of programs can you execute independently and at the same
time. The easiest way to find whether a language is single threaded or multithreaded is by knowing
how many call stacks it has. JS has one, so it is a single threaded language.
So, you may ask isn’t this a bottleneck? If I run multiple time consuming also referred to as
blocking operations like `HTTP` requests, the program will have to wait for the response of each
operation before executing the next one. To get around this problem, we need a way to do tasks
asynchronously even though we have a single thread, we will look at it in a bit.

## Environment

`V8` engine with Heap and Call stack is not everything there is to JS runtime. So far we have
discussed JS engine, but the JS engine doesn’t run in isolation, it runs inside
another environment, like small box inside a bigger one.

Let’s recap, `V8` is a JS engine that provides a runtime environment. The JS runtime
environment, provided by `V8` or any other JS Engine consists of the Memory Heap, and
Call stack, where the actual JS code is being compiled and executed. But there is also Host
Environment, like for example Browser’s one.

Things that make JS behave like it’s asynchronous, likewise provide us with abilities to
write complex software live in the Host Environment. Things like Event loop, Web APIs and the
Callback queue, which we will cover pretty soon, are not provided or supplied by `V8`, rather they
are provided by the environment that `V8` is hosted in. As I already mentioned, the hosting
environment for `V8` can be the browser (like Google Chrome) or Node.js.

We can assume that `Engine environment` + `Host Environment` provides us with so called `JS Runtime Environment`, even bigger box.
JRE is responsible for making JS asynchronous. It is the reason JS is able to add event listeners and make HTTP requests asynchronously,
while being syncrhonous and single-threaded nature.

The runtime environment is what makes JS code work in full potential. Due to that
environment JS can work both in browser or in Nodejs for example, and eventually
everywhere where `V8` engine can be embeded along with other components.

Let’s take example of Browser environment, and visualise how it may look underneath, and then
cover all the details and components in more detail. This is approximate overview of how browser JRE looks:

![Overview](https://user-images.githubusercontent.com/53371076/219686006-287383aa-5d16-46d2-8536-29ecb46e7a48.png)

Explored it? Earlier in the article, I already explained the role of `V8`’s side of things (Memory Heap and Call Stack) so lets move to rest of components in this chain.

### WEB APIs

The [Web APIs](https://developer.mozilla.org/en-US/docs/Web/API) are not a part of the JS engine, but they are part of the runtime environment
provided by the browser. There are a large number of APIs available in modern browsers that allow
us to a wide variety of things. Some of the most common categories of browser APIs let us:

**Manipulate documents**

One of the most common Web APIs used is [DOM API](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model), which allows developers to manipulate HTML and CSS, letting us create, change and even remove HTML and dynamically apply styles to our web pages.

**Draw and manipulate graphics**

Widely supported in browsers, [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) and [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) **l**et us programmatically update pixel data contained in a `<canvas>` element.

**Fetch data from a server**

[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) provides an interface for fetching resources across the network by using generic definitions of the Request and Response objects. Features like event listeners, timing functions
and AJAX requests all sit in the Web APIs container until an action gets triggered. A request
finishes receiving its data, a timer reaches its set time or a click happens and this triggers a
callback function to be sent to the callback queue.

### **The Callback Queue**

The callback queue stores the callback functions sent from the Web APIs in the order in which
they were added. This queue is a data structure that runs [first in, first out](<https://en.wikipedia.org/wiki/FIFO_(computing_and_electronics)>). The queue uses [the](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
[array push method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push) to add a new callback function to the end of the queue and [the array shift](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)
[method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift) to remove the first item in the queue.
Callback functions will sit in the queue until the call stack is empty, they are then moved into the
stack by the event loop.

### Event Loop

The Event Loop is the cog behind asynchronous programming. JS executes all
operations on it’s single thread, but using a few smart data structures, it gives us the illusion of
multi threading. Let’s go through the flow one more time, so we will understand important part of Event Loop.

Whenever an async function is called, it is sent to WEB APIs. These are APIs built into the
browser. Based on the command received from the Call Stack, the API starts its own single-
threaded operation. An example of this is the `setTimeout` method. When
a `setTimeout` operation is processed in the stack, it is sent to the corresponding API which waits
till the specified time to send this operation back in for processing.

Where does it send the operation? The Event Queue.

Hence, we have a cyclic system for running async operations in JS. The language itself is
single threaded, but the browser APIs act as separate threads. The Event Loop facilitates this
process, it constantly checks whether or not the Call Stack is empty, and if it is, new functions
are pushed there from the Event Queue, and if it is not, then the current function call is processed.

You can use this [interactive tool](http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D) to go through the flow by yourself, made by [Philip Roberts](https://twitter.com/philip_roberts)

## Going Deeper

#### Browser Event Loop

As you can see, Event Loop is a separate entity from `V8` Engine, it is not part of JS itself.
The Event Loop is provided by a separate library. However, [`V8` Engine does implement](https://chromium.googlesource.com/`v8`/`v8`/+/master/src/libplatform/default-platform.cc#140) some idea of Event Loop

Browser Environment and Node.js don’t use `V8`’s Event Loop, it is meant to be overriden or
replaced, which is something both Browser (for example Chrome) or Node happen to do.
In Browser, `V8` just executes your JS and then hands over operations to [Libevent](https://libevent.org/).
`V8` just executes your JS and then hands over operations to Libevent.

#### Node.js Event Loop

The Node Event Loop implementation differs a bit from the browser-based vent loop.
While Node uses the Google `V8` as its runtime, it uses [Libuv](https://github.com/libuv/libuv) library (written in C) to implement the Event Loop.
In Node.js, apart from `V8` Engine, environmnet aso contains libaries that can do a variety of things
such as netowrking, file system operations, listen to system events, delay execution and much
more. Nodejs event loop sit idle if there are no tasks in the callback que phases, but chrome event
look keeps running.

Nodejs runtime can be a bit more difficiult, but it still works kinda like browser one, but with more
things going on. I think it's important to have a basic understanding of what threads are before
even getting into the Node Event Loop.

So let's think of a thread as a to-do list of instructions that need to be executed by the CPU and
the CPU will run these threads one by one starting at the top on down. A single process can have
multiple threads inside of it.

To understand threads, it's important to also understand a concept called scheduling, as your CPU
can only process so many instructions per second. `V8` and `libuv` I have established are dependencies of NodeJS, this is what makes it possible to run JS outside the browser. Whenever we start up a Node program on our computer, Node
automatically starts up one thread and executes some code inside that thread. Inside that single
thread is something called the Event Loop, which can be thought of as a control structure which
decides what our one thread should be doing at any point in time.

It is the absolute core of any Node program and every Node program has exactly one Event Loop.
By default, `libuv` creates four threads in the threadpool. In addition to the threads used in the event
loop there are four other threads that can be used to offload expensive calculations that need to
occur inside the application. Many of the functions in the Node Standard Library make use of this
threadpool. `libuv` comes into the picture to create a threadpool composed of four threads.
`libuv` provides a threadpool for offloading work to be done on very expensive function calls.

## Conclusion

![`V8`](https://user-images.githubusercontent.com/53371076/219686059-957fc4c3-9d26-46c4-9cf1-04b15eda81ed.png)

As you can see, JS became so powerful not because of the language itself, but because
diverse and complex environments in which it is running and executing. Because of engines like
`V8`, whole lot of different environment components, like Event Loop, Thread Pool and more, it is
now possible to write complex applications in JS only, both on client side and on server
side, which makes this language a very good tool in hands of a developer.
![`V8`](https://user-images.githubusercontent.com/53371076/219686061-8e0e859c-a06d-4d2a-ba8b-252bbddd55cd.png)
