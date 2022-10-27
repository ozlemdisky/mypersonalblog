import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="site-container">
        <div className="space-y-5">
          <h1 className="text-1xl font-mono">Basical a Frontend Developer</h1>
          <p>
            I live in Bursa. I'm a translator. I started to develop myself in
            the frontend field. My goal is to make a career as a professional
            frontend developer.
          </p>
          <p>
            I like dealing with design and programming languages especially
            developing with JavaScript and I am confident.
          </p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto mt-20 ">
        <img src="/zehloss.jpg" alt="zehlos" />
      </div>
    </>
  );
}
