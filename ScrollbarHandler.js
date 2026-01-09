class ScrollbarHandler extends PointerEventHandler{
    axis="both";
    invert=true;
    scrollTop0 = 0;
    scrollLeft0 = 0;
    scrollbar = null
    constructor(target,options={}){
        super(target)
        this.axis = options.axis??'both';
        this.invert = options.invert??'both';
        this.scrollbar = options.scrollbar??target;
    }

    on(){
        this.target.addEventListener('pointerdown.peh',this.scrollPointerdown)
        this.target.addEventListener('pointermove.peh',this.scrollPointermove)
        this.target.addEventListener('pointerup.peh',this.scrollPointerup)
        this.target.addEventListener('pointerup.peh',this.scrollPointerup)
        this.target.addEventListener('pointercancel.peh',this.scrollPointerup)
        this.target.addEventListener('pointerleave.peh',this.scrollPointerup)
    }
    off(){
        this.target.removeEventListener('pointerdown.peh',this.scrollPointerdown)
        this.target.removeEventListener('pointermove.peh',this.scrollPointermove)
        this.target.removeEventListener('pointerup.peh',this.scrollPointerup)
        this.target.removeEventListener('pointercancel.peh',this.scrollPointerup)
        this.target.removeEventListener('pointerleave.peh',this.scrollPointerup)
    }
    scrollPointerdown = (event)=>{
        this.scrollLeft0 = this.scrollbar.scrollLeft;
        this.scrollTop0 = this.scrollbar.scrollTop;
        this.scrollbar.classList.add('scrolling');
    }
    scrollPointermove = (event)=>{
        
        const detail = event.detail;
        if(this.axis=='x' || this.axis=='both'){
           this.scrollbar.scrollLeft =  this.scrollLeft0 + detail.totalMetrics.distanceX*(this.invert?-1:1);
        }
        if(this.axis=='y' || this.axis=='both'){
           this.scrollbar.scrollTop =  this.scrollTop0 + detail.totalMetrics.distanceY*(this.invert?-1:1);
        }
    }
    scrollPointerup = (event)=>{
        this.scrollbar.classList.remove('scrolling');
    }
}