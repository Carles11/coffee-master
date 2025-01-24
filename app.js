
import Store from "./services/Store.js"
import { loadData } from "./services/Menu.js"

window.app = {}
app.store = Store

// It´s better to wait for the event for manipulation
window.addEventListener("DOMContentLoaded", async ()=>{
   loadData()
})
