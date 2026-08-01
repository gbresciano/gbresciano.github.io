//User variables to set
var photosize = 1024; //return maximum size picture (see for supported format:  http://code.google.com/apis/picasaweb/reference.html#Parameters)
var thumbsize = 256; //size thumb /cropped(see for supported format:  http://code.google.com/apis/picasaweb/reference.html#Parameters) {estaba en 64}
var albumcols = 4; // distribute thumbs on main page over x collums
var cols = 8; // distribute thumbs on albumphotos page over x collums
var maxresults = 999; //maximum of pictures on albumphotos page
var show_album = "6210822769775135825"; // album to display

function readGet(){
	var _GET = new Array(); var uriStr  = window.location.href.replace(/&amp;/g, '&'); var paraArr, paraSplit;
	if(uriStr.indexOf('?') > -1){ var uriArr  = uriStr.split('?');var paraStr = uriArr[1];}else{return _GET;}
	if(paraStr.indexOf('&') > -1){paraArr = paraStr.split('&');}else{paraArr = new Array(paraStr);}
	for(var i = 0; i < paraArr.length; i++){paraArr[i] = paraArr[i].indexOf('=') > -1 ? paraArr[i] : paraArr[i] + '=';paraSplit  = paraArr[i].split('='); _GET[paraSplit[0]] = decodeURI(paraSplit[1].replace(/\+/g, ' '));}
	return _GET;
}; var _GET = readGet();

if(!photosize){photosize = 640;}
var si = _GET['si'];
if(!si){si = 1}else{si=Number(si)};

function guillo(a){document.write(a);}

function formatDate(dt){
   var months = new Array(12);months[0]  = "January";months[1]  = "February";months[2]  = "March";months[3]  = "April";months[4]  = "May";months[5]  = "June";months[6]  = "July";months[7]  = "August";months[8]  = "September";months[9]  = "October";months[10] = "November";months[11] = "December";
	var today = new Date(Number(dt));
	var year = today.getYear(); if(year<1000){ year+=1900 };
	return ( months[(today.getMonth())] + " " + today.getDate() + ", " + year);
}
function formatDateTime(dt){
	var today = new Date(Number(dt));
	var year = today.getYear(); if(year<1000){ year+=1900 };
	return (today.getDate() + "-" + (today.getMonth()+1) + "-" + year + " " + today.getHours() + ":" + (today.getMinutes()<10 ? "0"+today.getMinutes() : today.getMinutes()) );
}

function albums(j){  //returns all photos in a specific album

	//get the number of photos in the album
	var np = j.feed.openSearch$totalResults.$t;
	var loc = j.feed.gphoto$location.$t;
	var desc = j.feed.subtitle.$t;
	var album_date = formatDate(j.feed.gphoto$timestamp.$t);
	var item_plural = "s";
	if (np == "1") { item_plural = ""; }
	var photoids = new Array();
	var len = j.feed.entry.length;

	guillo("<div class='container-fluid'><div class='row' id='links'>");

	for(z=0;z<len;z++){
		// get the list of all photos referenced in the album and display;
		// also stored in an array (photoids) for navigation in the photo view (passed via the URL)
		var id_base = j.feed.entry[z].gphoto$id.$t;
		photoids[z]=id_base; //must be pre-loaded before the URLs are generated. That's why we need to run the loop twice.
	}
 
	for(z=0;z<len;z++){
		var img_base = j.feed.entry[z].content.src;
		var id_base = j.feed.entry[z].gphoto$id.$t;
		var photoDate = j.feed.entry[z].exif$tags.exif$time ? formatDateTime(j.feed.entry[z].exif$tags.exif$time.$t) : "";  
		photoids[z]=id_base;
		if (z>0){ var prev = j.feed.entry[z-1].gphoto$id.$t; }
		if (z<len-1){ var next = j.feed.entry[z+1].gphoto$id.$t; }

		//photo page
		guillo("<div class='col-xs-3 col-sm-2' style='padding: 0;'><a  data-toggle='lightbox' data-gallery='example-gallery' href='"+img_base+"?imgmax="+photosize+"' class='img-fluid'><img src='"+img_base+"?imgmax="+thumbsize+"&crop=1' class='pwimages' style='width: 100%;'/></a><br/></div>");
	}

		guillo("</div></div>");
}

	guillo('<script type="text/javascript" src="https://picasaweb.google.com/data/feed/api/user/'+username+'/albumid/'+show_album+'?category=photo&alt=json&callback=albums&max-results='+maxresults+'&start-index='+si+'"></script>');//albums

//$Update: May 10, 2007$
//$Update: July 31, 2007, Jeroen Diderik$
//$Update: Januari 31, 2008, Jeroen Diderik$