const React = require('react');
const Helmet = require('react-helmet');
const classset = require('react-classset');





const CarouselDot = React.createClass({
 getInitialState() {
    return {
      currentSlide: 0 };
 },

onDotClick (index) {
    this.setState({
      currentSlide: index,
      lastSlide: this.state.currentSlide });
  },
  
  renderSlides () {
    return this.props.images.map((image, index) => {
      const { currentSlide, lastSlide } = this.state
      let isShown = index === currentSlide
      let classNames = classset({
        'carousel__slide': true,
        'carousel__slide--shown': isShown,
        'carousel__slide--leaving': index === lastSlide
      })
      
      return (
        <img aria-hidden={!isShown} className={classNames} src={image} alt='sup' />
      )
    })
  },
    
  renderDots() {
    return (
      <ul className='carousel__dots'>
        {
          this.props.images.map((_i, index) => {
            const { currentSlide } = this.state
            let classNames = classset({
              'carousel__dot': true,
              'carousel__dot--active': index === currentSlide
            })
            let id = `carousel${index}`

            return (

              <li className={classNames} key={index}>
                <input className='carousel__dot-input' id={id} type='radio' name='carousel-dots' value={index} onChange={this.onDotClick.bind(this, index)}></input>
                <label htmlFor={id}>•</label>
              </li>
            )
          })
        }
      </ul>
    )
  },
  
  render () {
    return (    
      <div className='carousel'>
        <div className='carousel__slider'>
          {this.renderSlides()}
        </div>
        {this.renderDots()}
      </div>
    )
  }
  

 
});


module.exports = CarouselDot;