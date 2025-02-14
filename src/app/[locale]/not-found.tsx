import Image from 'next/image';

export default function NotFound() {
  return (
    <section className="h-[75vh] w-full gap-y-4 sm:gap-y-6 md:gap-y-10">
      <div className="relative flex justify-center h-auto w-full">
        <Image
          title="not-found"
          src="/images/notfound.png"
          alt="not-found-image"
          width={1000}
          height={500}
        />
      </div>
    </section>
  );
}
