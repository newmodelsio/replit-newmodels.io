import { useGetNewModelsContent } from "@workspace/api-client-react";

import Logo from "./components/Logo"
import FeaturedPost from "./components/FeaturedPost"
import Aggregate from "./components/Aggregate"
import Footer from "./components/Footer"
import Nav from "./components/Nav"

export default function Main() {
  const { data, isLoading, isError, refetch } = useGetNewModelsContent({
    query: { retry: false },
  })

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6" role="status">
        Loading New Models…
      </main>
    )
  }

  if (isError || !data) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-3 p-6 text-center">
        <p role="alert">New Models content could not be loaded. Please try again.</p>
        <button className="underline" onClick={() => refetch()}>
          Try again
        </button>
      </main>
    )
  }

  return (
    <>
      <div className="flex justify-center p-10">
        <div className="w-[300px] h-[100px] bg-black"></div>
      </div>
      <Nav data={data} />
      <FeaturedPost featured={data.featured} />
      <a href="/logo" aria-label="New Models logo sources">
        <Logo />
      </a>
      <Aggregate data={data} />
      <Footer data={data} />
    </>
  )
}
