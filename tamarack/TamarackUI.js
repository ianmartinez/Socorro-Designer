var IdList = new Array();

class tkControl 
{
	constructor(_Id) 
	{
		if (IdList.indexOf(_Id) != -1)
			throw "Error: ID already registered with another control";
		else 
		{
			this.element = document.createElement("div");
			this.element.id = _Id;
		}
	}

	get InnerHtml() {
		return this.element.innerHTML;
	}

	set InnerHtml(_html) {
		this.element.innerHTML = _html;
	}

	GetId() 
	{
		return this.element.id;
	}

	get Element() 
	{
		return this.element;
	}

	set Element(_elem) 
	{
		this.element = _elem;
	}

	AddElementTo(_Destination) 
	{
		_Destination.appendChild(this.Element);
	}

	AddTo(_Destination) 
	{
		_Destination.Element.appendChild(this.Element);
	}
	
	RequestFullscreen()
	{
		if (this.element.requestFullscreen)
			this.element.requestFullscreen();
		else if (this.element.msRequestFullscreen) 
		  this.element.msRequestFullscreen();
		else if (this.element.mozRequestFullScreen) 
		  this.element.mozRequestFullScreen();
		else if (this.element.webkitRequestFullscreen) 
		  this.element.webkitRequestFullscreen();
	}	

	SetAttribute(_attr)
	{
		return this.element.getAttribute(_attr);
	}
	
	SetAttribute(_attr,_value)
	{
		this.element.setAttribute(_attr,_value);
	}
	
	set Width(_Width)
	{
		this.element.setAttribute("width",_Width);
	}

	get Width()
	{
		return this.element.getAttribute("width");
	}
	
	set Height(_Height)
	{
		this.element.setAttribute("height",_Height);
	}
	
	get Height()
	{
		return this.element.getAttribute("height");
	}
	
	set Class(_class) {
		this.element.className = _class;
	}

	get Class() {
		return this.element.className;
	}

	get Style() {
		return this.element.style;
	}
	
	GetClassList()
	{
		return this.element.classList;
	}

	Remove() {
		this.element.remove();
	}

	Clear() {
		while (this.element.firstChild) {
   			this.element.removeChild(this.element.firstChild);
		}
	}

	Delete() {
		var element = document.getElementById(this.GetId());
		element.outerHTML = "";
		element.remove();
		delete this;
	}
}

class tkElement extends tkControl 
{
	constructor(_Element) 
	{
		super(_Element.id);
		this.element = _Element;
	}
}

class tkText extends tkControl 
{
	constructor(_Id,_Tag) 
	{
		super(_Id);
		
		this.element = document.createElement(_Tag);
		this.TextNode = document.createTextNode("");
		this.element.appendChild(this.TextNode);
	}

	get Text() 
	{
		return this.TextNode.nodeValue;
	}
	
	set Text(_String) 
	{
		this.TextNode.nodeValue = _String;
	}
}

class tkButton extends tkText 
{
	constructor(_Id) 
	{
		super(_Id);
		
		this.element = document.createElement("button");
		this.TextNode = document.createTextNode("");
		this.element.appendChild(this.TextNode);
	}
}

class tkDiv extends tkControl 
{
	constructor(_Id) 
	{
		super(_Id);
	}
}

class tkFigure extends tkControl 
{
	constructor(_Id) 
	{
		super(_Id);
		this.element = document.createElement("figure");
		this.element.id = _Id;
	}
}

class tkMediaPlayer extends tkControl 
{
	constructor(_Id) 
	{
		super(_Id);
	}

	get Source() 
	{
		return this.element.src;
	}

	set Source(_Source) 
	{
		this.element.src = _Source;
	}
	
	HasControls()
	{
		return (this.element.hasAttribute("controls"));
	}
	
	SetControls(_Visibility)
	{
		if (this.HasControls() == true)
			this.element.removeAttribute("controls");
		
		if (_Visibility == true)
		{
			var ControlAtt = document.createAttribute("controls"); 
			this.element.setAttributeNode(ControlAtt);
		}
	}
	
	IsPaused()
	{
		return this.element.paused;
	}
	
	Play()
	{
		this.element.play();
	}
	
	Pause()
	{
		this.element.pause();
	}
	
	GetDuration()
	{
		return this.element.duration;
	}
	
	GetNetworkState()
	{
		return this.element.networkState;
	}
	
	GetReadyState()
	{
		return this.element.readyState;
	}
	
	GetSeekable()
	{
		return this.element.seekable;
	}
	
	IsSeeking()
	{
		return this.element.seeking;
	}
	
	get Looping()
	{
		return this.element.loop;
	}
	
	set Looping(_Looping)
	{
		this.element.loop = _Looping;
	}
	
	get Muted()
	{
		return this.element.muted;
	}
	
	set Muted(_Muted)
	{
		this.element.muted = _Muted;
	}
	
	get CurrentTime()
	{
		return this.element.currentTime;
	}
	
	set CurrentTime(_Time)
	{
		this.element.currentTime = _Time;
	}
	
	get PlaybackRate()
	{
		return this.element.playbackRate;
	}
	
	set PlaybackRate(_Rate)
	{
		this.element.playbackRate = _Rate;
	}
	
	get TextTracks()
	{
		return this.element.textTracks;
	}
	
	set TextTracks(_Tracks)
	{
		this.element.textTracks = _Tracks;
	}
	
	get Volume()
	{
		return this.element.volume;
	}
	
	set Volume(_Volume)
	{
		this.element.volume = _Volume;
	}
	
	CanPlay(_Type)
	{
		return this.element.csnPlsyType(_Type);
	}
}

class tkVideoPlayer extends tkMediaPlayer
{
	constructor(_Id)
	{
		super(_Id);
		this.element = document.createElement("video"); 
		this.element.id = _Id;
	}
}

class tkAudioPlayer extends tkMediaPlayer
{
	constructor(_Id)
	{
		super(_Id);		
		this.element = document.createElement("audio"); 
		this.element.id = _Id;
	}
}

class tkImage extends tkControl
{
	constructor(_Id)
	{
		super(_Id);		
		this.element = document.createElement("img"); 
		this.element.id = _Id;
	}

	get Source() 
	{
		return this.element.src;
	}

	set Source(_Source) 
	{
		this.element.src = _Source;
	}
	
	// Image alternative text
	get Alt() 
	{
		return this.element.alt;
	}

	set Alt(_Alt) 
	{
		this.element.alt = _Alt;
	}
}

class tkLink extends tkText
{
	constructor(_Id)
	{
		super(_Id);
		
		this.element = document.createElement("a"); 
		this.TextNode = document.createTextNode("");
		this.element.appendChild(this.TextNode);
		this.element.id = _Id;
	}
	
	// Link source
	get Source() 
	{
		return this.element.getAttribute("href");
	}

	set Source(_Source) 
	{
		this.element.setAttribute("href",_Source);
	}
}

class tkProgress extends tkControl
{
	constructor(_Id)
	{
		super(_Id);
		this.element = document.createElement("progress"); 
		this.element.id = _Id;
	}
	
	get Max()
	{
		return this.element.max;
	}
	
	set Max(_Max)
	{
		this.element.max = _Max;
	}
	
	get Value()
	{
		return this.element.value;
	}
	
	set Value(_Value)
	{
		this.element.value = _Value;
	}
}

class tkMeter extends tkControl
{
	constructor(_Id)
	{
		super(_Id);
		
		this.element = document.createElement("meter"); 
		this.element.id = _Id;
		this.element.id = _Id;
	}
	
	get Value()
	{
		return this.element.value;
	}
	
	set Value(_Value)
	{
		this.element.value = _Value;
	}
	
	get High()
	{
		return this.element.high;
	}
	
	set High(_High)
	{
		this.element.high = _High;
	}
	
	get Low()
	{
		return this.element.low;
	}
	
	set Low(_Low)
	{
		this.element.low = _Low;
	}
	
	get Max()
	{
		return this.element.max;
	}
	
	set Max(_Max)
	{
		this.element.max = _Max;
	}
	
	get Min()
	{
		return this.element.min;
	}
	
	set Min(_Min)
	{
		this.element.min = _Min;
	}
	
	get Optimum()
	{
		return this.element.optimum;
	}
	
	set Optimum(_Optimum)
	{
		this.element.optimum = _Optimum;
	}
}

class tkReviewMeter extends tkMeter
{
	constructor(_Id,_Rating)
	{
		super(_Id);
		
		this.Value = _Rating;
		this.Max = 5;
		this.Min = 0;
		this.Optimum = 5;
		this.Low = 2;
		this.High = 4;
	}
}

class tkSlideshow {
	constructor(_Id,_ArrImages) {
		this.Id = _Id;

		this.ImageArray = _ArrImages;
		
		this.Modal = new tkDiv(_Id + "_" + "Modal");
		this.Modal.Class = "modal";

		this.CloseCursor = new tkText(_Id + "_" + "CloseCursor","span");
		this.CloseCursor.Class = "close cursor";
		this.CloseCursor.Text= "x";
		this.CloseCursor.Element.onclick = () => {this.Close()};
		this.CloseCursor.AddTo(this.Modal);

		this.ModalContent = new tkDiv(_Id + "_" + "ModalContent");
		this.ModalContent.AddTo(this.Modal);

		for(var i = 0; i<_ArrImages.length; i++) 
		{
			var CurrentSlide = this.CreateSlide(_ArrImages[i],i+1,_ArrImages.length);
			CurrentSlide.AddTo(this.ModalContent);
		}

		this.PrevButton = new tkLink(_Id + "_" + "PrevButton");
		this.PrevButton.Class = "prev";
		this.PrevButton.Element.onclick = () => {this.PlusSlides(-1)};
		this.PrevButton.Text = "<";
		this.PrevButton.AddTo(this.ModalContent);

		this.NextButton = new tkLink(_Id + "_" + "NextButton");
		this.NextButton.Class = "next";
		this.NextButton.Element.onclick = () => {this.PlusSlides(1)};
		this.NextButton.Text = ">";
		this.NextButton.AddTo(this.ModalContent);

		this.Modal.AddElementTo(document.body);

		this.SlideIndex = 1;
		this.ShowSlides(this.SlideIndex);
	}

	CreateSlide(_ImageSrc,_ImagePos,_ImageTotal) {
		var Slide = new tkDiv(this.Id + "_" + "Slide");
		Slide.Class = "mySlides";

		var NumberText = new tkText(this.Id + "_" + "NumberText","div");
		NumberText.Text = _ImagePos + " / " + _ImageTotal;
		NumberText.AddTo(Slide);

		var SlideImage = new tkImage(this.Id + "_" + "SlideImage");
		SlideImage.Source = _ImageSrc;
		SlideImage.Style.width = "80%";
		SlideImage.Style.marginLeft = "auto";
		SlideImage.Style.marginRight = "auto";
		SlideImage.Style.display = "block";
		SlideImage.AddTo(Slide);

		return Slide;
	}

	Close() {
		this.Modal.Style.display = "none";
		this.Modal.Delete();
	}	

	Open() {
		this.Modal.Style.display = "block";
	}	

	PlusSlides(_n) {
		this.ShowSlides(this.SlideIndex += _n);
	}

	CurrentSlide(_n) {
		this.ShowSlides(this.SlideIndex = _n);
	}

	ShowSlides(_n) {
		var slides = document.getElementsByClassName("mySlides");
		if (_n > slides.length) {this.SlideIndex = 1}
		if (_n < 1) {this.SlideIndex = slides.length}

		for (var i = 0; i < slides.length; i++) {
			slides[i].style.display = "none";
		}

		slides[this.SlideIndex-1].style.display = "block";
	}
}

function GrabElement(_id) {
	return new tkElement(document.getElementById(_id));
}


function MakeClassElement(_class) {
	return new tkElement(document.getElementsByClassName(_class)[0]);
}