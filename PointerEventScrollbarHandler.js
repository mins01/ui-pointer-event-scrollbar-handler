class PointerEventScrollbarHandler extends PointerEventHandler{
    axis="both";
    invert=true;
    scrollTop0 = 0;
    scrollLeft0 = 0;
    scrollbar = null
    multiplier = 1;
    constructor(target,options={}){
        super(target)
        this.axis = options.axis??'both';
        this.invert = options.invert??'both';
        this.scrollbar = options.scrollbar??target;
        this.multiplier = options.multiplier??1;
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
        this.target.classList.add('dragging');
        this.scrollbar.classList.add('scrolling');
    }
    scrollPointermove = (event)=>{
        
        const detail = event.detail;
        const scrollLeft =  (this.axis=='x' || this.axis=='both')?(this.scrollLeft0 + detail.totalMetrics.distanceX*(this.invert?-1:1)*this.multiplier):this.scrollbar.scrollLeft0 ;
        const scrollTop =  (this.axis=='y' || this.axis=='both')?(this.scrollTop0 + detail.totalMetrics.distanceY*(this.invert?-1:1)*this.multiplier):this.scrollbar.scrollTop0 ;
        this.scrollbar.scrollTo(scrollLeft,scrollTop);
    }
    scrollPointerup = (event)=>{
        this.target.classList.remove('dragging');
        this.scrollbar.classList.remove('scrolling');
    }
}