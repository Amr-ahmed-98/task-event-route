import {  QueryClient, QueryClientProvider } from "@tanstack/react-query"
import TableOfCustmers from "./Components/TableOfCustmers/TableOfCustmers"
import Loader from "./Components/Loader/Loader"
import { useEffect, useState } from "react"
import Graph from "./Components/Graph/Graph"


function App() {
 const queryClient = new QueryClient()
 const [isLoading, setIsLoading] = useState(true)

useEffect(()=>{
  const store = setTimeout(()=>{
   setIsLoading(false)
  },2000)
  return ()=> clearTimeout(store)  
})

 if(isLoading) return <Loader />

  return (
    <>
    <QueryClientProvider client={queryClient}>
    <div className="min-h-screen bg-[#222831]">
      <div className="container">
      <TableOfCustmers/>
      <Graph/>
      </div>
    </div>
    </QueryClientProvider>
    </>
  )
}

export default App
