import Image from "next/image";

export default function CImg({ src, width, height, alt }) {
  // react-markdown passes props as STRINGS
const parsedWidth = parseInt(width);
const parsedHeight = parseInt(height);
console.log(src)

  return (
      <Image
        src={src}
        alt={alt || ""}
        width={parsedWidth}
        height={parsedHeight}
        style={{
          width: "auto",
          maxHeight: "var(--spacings-xl8)",
          margin: "var(--spacings-xl) auto 0 auto",
        }}
      />
  );
}
