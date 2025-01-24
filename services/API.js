const API = {
    url:"/data/menu.json",
    fetchMenu: async () =>{
       const result = await fetch(API.url)
       const finalResult = await result.json()
       return finalResult
    }
}
export default API 