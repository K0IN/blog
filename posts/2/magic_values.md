---
title: Magic numbers and values
date: 2025-09-23
description: A list of important magic numbers, for programmers, to identify what they are working with.
layout: post
tags:
  - File Formats
  - Programming
  - Intuition
---

## What are magic numbers or File signatures?

File signatures (also known as magic numbers) are specific sequences of bytes or numbers that are used to identify file formats, protocols, or data structures. They are commonly found at the start of content.

## Why is it useful to know about some of them?

Sometimes you are presented with a string or a byte array and you have no idea what it is. If you know some of the magic numbers, you can quickly identify what you are working with.

For example, maybe a web server returns a response with a content-type of `application/octet-stream` and you have no idea what it is. Or a file has no extension. You might also discover some interesting insights, like [.jar](https://en.wikipedia.org/wiki/JAR_(file_format)#Extraction) or [.apk](https://en.wikipedia.org/wiki/Apk_(file_format)#Package_contents) files are just zip files, and can be unpacked as such. Knowing some of the magic numbers can help you quickly identify what you are working with.

## A list of Magic Numbers I found useful

### Identifying JSON (Base64 encoded)

This is something useful to recognize, but if you see a string that starts with `ey` or `ew` it *might* be a Base64 encoded JSON string. The reason for this is that the Base64 encoding of the `{"` character is `ey`. Here are the most common JSON starting characters and their Base64 encoded representations:

```javascript
// minified json string
console.log(btoa('{"')); // eyI=
// with whitespace
console.log(btoa('{ "')); // eyAi
// with newline
console.log(btoa('{\n')); // ewo=
```

### ZIP archives

If you see a file or stream that starts with `50 4B 03 04` (or `PK..` in ASCII) it is likely a ZIP archive. This is useful to know because many file formats are actually ZIP files, such as `.jar`, `.apk`, `.docx`, `.xlsx`, `.pptx` [and so much more](https://en.wikipedia.org/wiki/List_of_file_signatures#:~:TEXT=50%204B&text=its%20descendants%20(rare)-,50%204B%2003%2004,-50%204B%2005) are ZIP files under the hood.

### Shebang (#!)

A shebang is a character sequence at the beginning of a script file that indicates which interpreter should be used to execute the script. \
It consists of the characters `#!` followed by the path to the interpreter. \
For example, a Python script might start with `#!/usr/bin/env python3` to indicate that it should be run with Python 3.

### Identifying JWT (JSON Web Tokens)

If you work with web apps that use authentication, you might have come across [JWT tokens](https://jwt.io/). \
JWT tokens have a specific structure and format, which can be identified by their header, payload, and signature sections.

These are Base64Url encoded JSON strings separated by dots (`.`).

You can use the start `eyJ` to identify a JSON or JWT token. The `eyJ` is the Base64Url encoded representation of the string `{"`, which is the beginning of a JWT token's header section (which looks something like this: `{"alg":"HS256","typ":"JWT"}`).

### Media files

Here are some common magic numbers for media files:

*Note: In the ASCII column, dots (`.`) represent non-printable bytes, and `??` represents variable bytes.*

| File Type       | Magic Number (Hex) | Magic Number (ASCII) |
|-----------------|--------------------|----------------------|
| JPEG            | FF D8 FF           | ...                  |
| PNG             | 89 50 4E 47 0D 0A 1A 0A | .PNG....             |
| GIF             | 47 49 46 38 37 61 or 47 49 46 38 39 61 | GIF87a or GIF89a    |
| MP3             | FF FB or FF F3 or FF F2 | .. or .. or ..       |
| MP4             | 00 00 00 ?? 66 74 79 70 | ....ftyp            |
| WebP            | 52 49 46 46 ?? ?? ?? ?? 57 45 42 50 | RIFF....WEBP        |
| WebM            | 1A 45 DF A3         | ....                 |
| AVI             | 52 49 46 46 ?? ?? ?? ?? 41 56 49 20 | RIFF....AVI         |
| WAV             | 52 49 46 46 ?? ?? ?? ?? 57 41 56 45 | RIFF....WAVE        |
| PDF             | 25 50 44 46 2D       | %PDF-                |
| WOFF Font       | 77 4F 46 46         | wOFF                 |
| WOFF2 Font      | 77 4F 46 32         | wOF2                 |

### Archive formats

| File Type       | Magic Number (Hex) | Magic Number (ASCII) |
|-----------------|--------------------|----------------------|
| ZIP             | 50 4B 03 04         | PK..                 |
| RAR             | 52 61 72 21 1A 07 00 | Rar!...              |
| 7Z              | 37 7A BC AF 27 1C   | 7z..'.               |
| TAR             | 75 73 74 61 72      | ustar                |

### Modern development formats

Here are some other formats commonly encountered in modern web development and applications:

| File Type       | Magic Number (Hex) | Magic Number (ASCII) |
|-----------------|--------------------|----------------------|
| SQLite Database | 53 51 4C 69 74 65 20 66 6F 72 6D 61 74 20 33 00 | SQLite format 3.     |
| WebAssembly     | 00 61 73 6D         | .asm                 |

### Executables

Here are some common magic numbers for executable files:

| Operating System | Magic Number (Hex) | Magic Number (ASCII) |
|------------------|--------------------|----------------------|
| Windows PE       | 4D 5A              | MZ                   |
| Linux ELF        | 7F 45 4C 46       | .ELF                 |
| MacOS Mach-O     | CF FA ED FE       | .... (non-printable)  |
| Linux Script    | 23 21              | #!                   |
| MacOS Script    | 23 21              | #!                   |

## Tools to help you identify magic numbers

There are many tools available to help you identify magic numbers and file signatures. Here are a few:

- [TrID](https://mark0.net/soft-trid-e.html): A file identifier tool that can analyze files and identify their types based on their signatures.
- [file command](https://man7.org/linux/man-pages/man1/file.1.html): A command-line tool that can identify file types based on their magic numbers.

Most of the time you can get away with just using the `file` command in your terminal:

```bash
file <path to file>
```

If you want a hexdump of a file you can use the `hexdump` command:

```bash
> hexdump -C <path to file> | head -n 10
# Example
> hexdump -C /bin/bash | head -n 10
00000000  7f 45 4c 46 02 01 01 00  00 00 00 00 00 00 00 00  |.ELF............| # the .ELF indicates it's an ELF executable
00000010  03 00 3e 00 01 00 00 00  80 e5 01 00 00 00 00 00  |..>.............|
00000020  40 00 00 00 00 00 00 00  58 b5 11 00 00 00 00 00  |@.......X.......|
00000030  00 00 00 00 40 00 38 00  0e 00 40 00 1c 00 1b 00  |....@.8...@.....|
00000040  06 00 00 00 04 00 00 00  40 00 00 00 00 00 00 00  |........@.......|
00000050  40 00 00 00 00 00 00 00  40 00 00 00 00 00 00 00  |@.......@.......|
00000060  10 03 00 00 00 00 00 00  10 03 00 00 00 00 00 00  |................|
00000070  08 00 00 00 00 00 00 00  03 00 00 00 04 00 00 00  |................|
00000080  c4 03 00 00 00 00 00 00  c4 03 00 00 00 00 00 00  |................|
00000090  c4 03 00 00 00 00 00 00  1c 00 00 00 00 00 00 00  |................|
```

## More Resources

- [Here is a full list on wikipedia](https://en.wikipedia.org/wiki/List_of_file_signatures)
- [More about format indicators](https://en.wikipedia.org/wiki/Magic_number_(programming)#Format_indicator)
