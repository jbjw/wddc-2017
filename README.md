# wddc-2017

This is my project for the 2017 Wikipedia Data Design Challenge. It's current evolution is a geography game that pulls data from [Wikidata](https://www.wikidata.org/wiki/Wikidata:Main_Page). Currently it uses just geographic data like "Airports in Belgium", and you place a marker where you think the item is and it shows you how much you b0rked it.

I am now working on including less direct data, like showing a portrait of somebody or playing a soundbyte, after which you would guess where the item came from, so the game will focus on more than just geographic knowledge.

I also want to implement local multiplayer, possibly on one machine, but more likely the phones-as-remotes-and-computer-projected-or-put-on-TV method. (By the way, if anyone knows anything about that method - terminology, examples, blog posts - I'd love to hear from you: [github@jbjw.com](mailto:github@jbjw.com?Subject=Hello)).

### Event info
There's no proper page for the event yet, just these:  
https://www.eventbrite.com/e/wikipedia-data-design-challenge-2017-tickets-31783891475#  
https://www.meetup.com/Bay-Area-d3-User-Group/events/237986953/  

The organizers said that Wikimedia will make a blog post about the event and showcase some of the projects, probably on https://blog.wikimedia.org/  

### Stuff I used
Wikidata: https://www.wikidata.org/wiki/Wikidata:Main_Page  
Nice web interface for querying Wikidata: https://query.wikidata.org/  
OpenStreetMap: https://www.openstreetmap.org/  

Leaflet: http://leafletjs.com/  
D3: https://d3js.org/  
React: https://facebook.github.io/react/  

### Todo
complex datasets (pictures of people, inventions, language soundbytes)  
multiplayer (phone remotes)  
zoom game mode  
hosted demo
get running instructions, npm, etc
info for devs? webpack, babel, react, etc
