import React from 'react'

export default class QuizPage extends React.Component {

  // state = {
  //   combination_skin: "If combination, your skin can be dry or normal in some areas and oily in others, such as the T-zone (nose, forehead, and chin). Many people have this type. It may need slightly different care in different areas. Combination skin can have pores that look larger than normal, because they’re more open, Blackheads, Shiny",
  //   oily: "If oily, you may have: enlarged pores, Dull or shiny, thick complexion, blackheads, pimples, or other blemishes. Oiliness can change depending upon the time of year or the weather. Things that can cause or worsen it include: hormonal imbalances, stress, heat or too much humidity",
  //   dry: "If dry, you may have: Almost invisible pores, dull/rough complexion, red patches, more visible lines, your skin can crack, peel, or become itchy, irritated, or inflamed. If it’s very dry, it can become rough and scaly, especially on the backs of your hands, arms, and legs.",
  //   all: "Normal skin type, middle of the road across the board"
  // }

  render () {
    return (
      <React.Fragment>
      <div className="quiz-page">
        <h3>{this.props.question}</h3>
        <div className="quiz-buttons">
          <button onClick={this.props.handleSkintype}>DRY</button>
          <button onClick={this.props.handleSkintype}>COMBINATION</button>
          <button onClick={this.props.handleSkintype}>OILY</button>
        </div>
      </div>
      </React.Fragment>

    )
  }
}
