var movieurl="https://api.themoviedb.org/3/movie/";
var apikey= "2dd432ec6760250c9976a20a7bd7fb09";
var imgurl="https://image.tmdb.org/t/p/w185";
var tvurl="https://api.themoviedb.org/3/tv/"

//display the datas 
const createcards=document.querySelector(".populardly")
const container=document.createElement("div")
createcards.append(container)
container.setAttribute("class","container")
const header=document.createElement("div")
container.append(header)
const row=document.createElement("div")
container.append(row)
row.setAttribute("class","row")

  
//creating cards to display  data into it...
    function cards(get){
    const column=document.createElement("div")
    row.append(column)
    column.setAttribute("class","col-12 col-sm-6 col-md-4 col-lg-4 column1")
    const anch=document.createElement("a")
    column.append(anch)
    anch.setAttribute("onclick",`moviedetails(${get.id})`)
    anch.setAttribute("href","#")
    const card=document.createElement("div")
    anch.append(card)
    card.setAttribute("class","card")
    const img=document.createElement("img")
    card.append(img)
    img.setAttribute("src",`${imgurl}${get.poster_path}`)
    img.setAttribute("width","100px")
    const cardbody=document.createElement("div")
    card.append(cardbody);
    cardbody.setAttribute("class","card-text")
    cardbody.innerHTML=`<p><label>Title :</label> ${get.title}<br><label>Release date :</label> ${get.release_date}<br>
    <i class="fa fa-star" aria-hidden="true"></i>${get.vote_average.toFixed(1)}<p>`   
}


//fetching the popular movie data from TMDB...
const mostpopular=document.querySelector(".mostpopular")
 mostpopular.addEventListener("click", async()=>{
         row.innerHTML="";
         header.innerHTML="<h4>Most Popular<h4>"
try{
  await  fetch(`${movieurl}popular?api_key=${apikey}`)
    .then((res)=>res.json())
    .then((val)=>{
        for(i of val.results)
        cards(i)
         
    })
}
catch(error){
       row.innerHTML="sorry! unable to fetch data"
       console.log(error)
   }
})

//fetching the top rated movie data from TMDB...
const toprating=document.querySelector(".toprating")
toprating.addEventListener("click",async()=>{ 
    row.innerHTML="";  
    header.innerHTML="<h4>Top Rated<h4>"
try{    
  await  fetch(`${movieurl}top_rated?api_key=${apikey}`)
    .then((res)=>res.json())
    .then((val)=>{
        for(i of val.results)
        cards(i)
    })
}
catch(error){
    row.innerHTML="sorry! unable to fetch data"
    console.log(error)
}   
})

//add eventlistener and fetching the data for search results...
const searchbtn=document.querySelector(".searchbtn")
const searchinput=document.querySelector(".searchinput")
searchbtn.addEventListener("click",async(e)=>{ 
    e.preventDefault()
    row.innerHTML="";  
    header.innerHTML="<h4>Results<h4>"
try{    
  await  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${searchinput.value}`)
    .then((res)=>res.json())
    .then((val)=>{
        for(i of val.results)
       // console.log(i)
       cards(i)
    })
}
catch(error){
    row.innerHTML="sorry! unable to fetch data"
       console.log(error)
}
})

// fetching upcoming movies list from TMDB API...
const upcoming=document.querySelector(".upcoming")
upcoming.addEventListener("click",async(e)=>{ 
    row.innerHTML="";  
    header.innerHTML="<h4>Upcoming Movies<h4>"
try{ 
  await  fetch(`${movieurl}upcoming?api_key=${apikey}`)
    .then((res)=>res.json())
    .then((val)=>{
        for(i of val.results)
       //console.log(i)
       cards(i)
    })
}
catch(error){
    row.innerHTML="sorry! unable to fetch data"
       console.log(error)
}    
})

//fetching now playing in theatre movies
const latestmovie= async function(){
     row.innerHTML="";  
     header.innerHTML="<h4>Now Playing<h4>"
    await  fetch(`${movieurl}now_playing?api_key=${apikey}`)
      .then((res)=>res.json())
      .then((val)=>{
          for(i=0;i<6;i++)
          cards(val.results[i])
      })
}
latestmovie()

//creating card to display movie detail 
function card(alldata){
    const column=document.createElement("div")
    row.append(column)
    column.setAttribute("class","col-12 col-sm-12 col-md-12 col-lg-12 column1")
    const card=document.createElement("div")
    column.append(card)
    card.setAttribute("class","card1")
    const cardbody=document.createElement("div")
    card.append(cardbody)
    cardbody.setAttribute("class","card-body1")
    const img=document.createElement("img")
    cardbody.append(img)
    img.setAttribute("src",`${imgurl}${alldata.poster_path}`)
    img.setAttribute("width","200px")
    const cardtext=document.createElement("div")
    cardbody.append(cardtext);
    cardtext.setAttribute("class","card-text")
    cardtext.innerHTML=`<p><label>Title :</label> ${alldata.title}<br><br><label>Runtime :</label> ${alldata.runtime} min<br><br><i class="fa fa-star" aria-hidden="true">
    </i>${alldata.vote_average.toFixed(1)} (${alldata.vote_count})<br><br><label>Popularity :</label> ${alldata.popularity}<br><br>
    <label>Status :</label> ${alldata.status}<p>`
    const cardarea=document.createElement("div")
    card.append(cardarea)
    cardarea.setAttribute("class","cardarea")
    cardarea.innerHTML=`<p><label>Overview :</label> ${alldata.overview}<br><br><label>Original title :</label> ${alldata.original_title}<br><br>
    <label>Original Language :</label> ${alldata.original_language}<br><br><label>Budget :</label> ${alldata.budget} .Rs<br><br>
    <label>Boxoffice :</label> ${alldata.revenue} .Rs<br><br><label>Homepage :</label><a href="${alldata.homepage}" > ${alldata.homepage}</a></p>`
}

//getting movie id from anch set attribute on click from cards() function
const moviedetails= function(set){
    console.log(set)
      row.innerHTML="";
    header.innerHTML=`<h4>Details<h4>`
     fetch(`https://api.themoviedb.org/3/movie/${set}?api_key=${apikey}`)
     .then((res)=>res.json())
     .then((val)=>{
          card(val)
     })
}
