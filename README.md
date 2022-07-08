# steganography_ts

steganography_ts is a TypeScript library used to encode secret messages inside images and to decode them again.  
It will be a replacement of steganography.js to TypeScript. The usage itself is the same.

## How does it work

Behind the scenes steganography_ts uses an algorithm to convert the given message into appropriate binary data which then will be hidden in the alpha channel of the given cover image. A HTML5 canvas element is then used to process the data and the image.
To decode a message from a given image, a similiar algorithm is applied on the imagedata.

## How to use it

~~The use of the library is very simple. You just have to add the .js-file to your website and by now you can make use of the global object **steganography** or short **steg** and the two provided functions **encode** and **decode**.~~

```shell
$ npm install steganography_ts
```

- **encode** takes a _message_ as String and a _image_ as Image, HTMLImageElement or String representing the data-URL of the cover image. Returns the data-URL of the image with the encoded message inside.
- **decode** takes a _image_ as Image, HTMLImageElement or String representing the data-URL of the image and returns the message which was found in the image.
