/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/ban-types */
import React from 'react'

type FeelClassification = {
  name: string
  description: string
  unitPrice: number
  numOfPeople: number
  totalPrice: number
}

type DetailProps = {
  classification: FeelClassification
  onNumOfPeopleChange: (num: number) => void
}

// 明細
const Detail: React.FC<DetailProps> = (props) => {
  const onNumOfPeopleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const num = Number(e.target.value)
    props.onNumOfPeopleChange(num)
  }
  return (
    <div>
      <div className="classification-name">{props.classification.name}</div>
      <div className="description">{props.classification.description}</div>
      <div className="unit-price">{props.classification.unitPrice}円</div>
      <div className="num-people">
        <select
          value={props.classification.numOfPeople}
          onChange={(e) => onNumOfPeopleChange(e)}
        >
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <span>名</span>
      </div>
    </div>
  )
}

type SummaryProps = {
  numOfPeople: number
  totalAmount: number
}

// サマリー
const Summary: React.FC<SummaryProps> = (props) => {
  return (
    <div>
      <div className="party">
        <input
          type="text"
          className="party"
          value={props.numOfPeople}
          readOnly
        />
        <span>名様</span>
      </div>
      <div className="total-amount">
        <span>合計</span>
        <input
          type="text"
          className="total-amount"
          value={props.totalAmount}
          readOnly
        />
        <span>円</span>
      </div>
    </div>
  )
}

type AdmissionFeeCalculatorState = {
  feelClassifications: FeelClassification[]
}

class AdmissionFeeCalculator extends React.Component<
  {},
  AdmissionFeeCalculatorState
> {
  constructor(props: {}) {
    super(props)
    const adults: FeelClassification = {
      name: '大人',
      description: '',
      unitPrice: 1000,
      numOfPeople: 0,
      totalPrice: 0
    }
    const students: FeelClassification = {
      name: '学生',
      description: '中学生・高校生',
      unitPrice: 700,
      numOfPeople: 0,
      totalPrice: 0
    }
    const children: FeelClassification = {
      name: '子ども',
      description: '小学生',
      unitPrice: 300,
      numOfPeople: 0,
      totalPrice: 0
    }
    const infants: FeelClassification = {
      name: '幼児',
      description: '未就学児',
      unitPrice: 0,
      numOfPeople: 0,
      totalPrice: 0
    }
    this.state = {
      feelClassifications: [adults, students, children, infants]
    }
  }

  handleNumOfpeopleChange(idx: number, num: number) {
    const currentFC = this.state.feelClassifications[idx]
    const newTotalPrice = currentFC.unitPrice * num
    // 人数と合計額を変更、それ以外は既存の値でコピー
    const newFC: FeelClassification = Object.assign({}, currentFC, {
      numOfPeople: num,
      totalPrice: newTotalPrice
    })
    // 新しい配列を生成
    const feelClassifications = this.state.feelClassifications.slice()
    feelClassifications[idx] = newFC

    this.setState({
      feelClassifications: feelClassifications
    })
  }

  render() {
    const details = this.state.feelClassifications.map((fc, idx) => {
      return (
        <Detail
          key={idx.toString()}
          classification={fc}
          onNumOfPeopleChange={(n) => this.handleNumOfpeopleChange(idx, n)}
        />
      )
    })
    const numOfPeople = this.state.feelClassifications
      .map((fc) => fc.numOfPeople)
      .reduce((p, c) => p + c)
    const totalAmount = this.state.feelClassifications
      .map((fc) => fc.totalPrice)
      .reduce((p, c) => p + c)

    return (
      <>
        {details}
        <Summary numOfPeople={numOfPeople} totalAmount={totalAmount} />
      </>
    )
  }
}

const App: React.FC = () => {
  return (
    <div className="main">
      <AdmissionFeeCalculator />
    </div>
  )
}

export default App
