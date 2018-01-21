import React from 'react'
import { Image } from 'semantic-ui-react'

const RegRoute = ({ component: Component }) => (
  <React.Fragment>
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
      }}
    >
      <Image
        style={{ marginBottom: 20, marginLeft: '36%', marginTop: 30 }}
        verticalAlign="middle"
        src="http://www.accinigeria.com/wp-content/uploads/2017/10/ACCIHD2-2.png"
      />
    </div>

    <Component />
  </React.Fragment>
)

export default RegRoute
