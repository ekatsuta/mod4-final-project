import React from 'react'
import MainContainer from './MainContainer'

export default class QuizPage extends React.Component {

  state = {
    combination_skin: "Your skin can be dry or normal in some areas and oily in others, such as the T-zone (nose, forehead, and chin). Many people have this type. It may need slightly different care in different areas. Combination skin can have pores that look larger than normal, because they’re more open, Blackheads, Shiny",
    oily: "You may have: enlarged pores, Dull or shiny, thick complexion, blackheads, pimples, or other blemishes. Oiliness can change depending upon the time of year or the weather. Things that can cause or worsen it include: hormonal imbalances, stress, heat or too much humidity",
    dry: "You may have: Almost invisible pores, dull/rough complexion, red patches, more visible lines, your skin can crack, peel, or become itchy, irritated, or inflamed. If it’s very dry, it can become rough and scaly, especially on the backs of your hands, arms, and legs.",
    all: "Normal skin type"
  }

  //maybe using router to make a redirect or Link to home
  //how to keep the answer? lifting state.
  // anotherOne = () => {
  //   if (this.props.skintype === this.state.answer) {
  //     return (<MainContainer products={this.props.userCollection}/>)
  //   }
  // }

  //how to show "all" skintype products along with the products for "dry", "oily", and "combination" products//

  render () {
    console.log(this.props.answer, "quiz")

    return (
      <div>
      <p>{this.state.combination_skin}</p>
      <p>{this.state.oily}</p>
      <p>{this.state.dry}</p>
      <p>{this.state.all}</p>
      <form onSubmit={this.props.handleSubmit}>
        <h3>{this.props.question}</h3>
          <input onChange={this.props.handleInput} type="text" name="answer" value={this.props.answer} placeholder="Dry, combination, oily, or all" />

          <input type="submit" value="Submit" />
      </form>

      </div>

    )
  }
}
