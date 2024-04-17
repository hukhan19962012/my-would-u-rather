import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import _ from 'lodash'
import { Tab, TabList, TabPanel, Tabs } from "react-tabs"

export const Home = () => {

    const { authUser, users, questions } = useSelector(state => state)
    const navigate = useNavigate()


    useEffect(() => {
        if (authUser === null) {
            navigate('/login?returnUrl=home')
        }
    }, [authUser, navigate])

    const showAvatar = (author) => {
        let user = _.pick(users, author)[author]
        return user.avatarURL
        
    }

    return (
        <>
<Tabs>
    <TabList>
      <Tab key={'new'}><button className="btn btn-success"><h3>New</h3></button></Tab>
      <Tab key={'done'}><button className="btn btn-secondary"><h3>Done</h3></button></Tab>
    </TabList>
    <TabPanel key={'new-tab'}>
    <h1 className="text-center">Questions</h1>
            <div className="questions mb-5 mt-5 mx-auto">
                {Object.values(questions).filter(q => !(Object.values(q.optionOne.votes).includes(authUser?.id) || Object.values(q.optionTwo.votes).includes(authUser?.id))).sort((a,b,) => b.timestamp - a.timestamp).map(q => (
                <div className="card" style={{ width: '18rem' }}  key={q?.id}>
                    <img className="card-img-top" src={showAvatar(q.author)} alt="author" />
                    <div className="card-body">
                        <div className="card-info mb-3">
                        <h5 className="card-title">{q.author}</h5>
                        <p className="card-text">{new Date(q.timestamp).toLocaleDateString()}</p>
                        </div>
                        <Link to={`/questions/${q?.id}`} className='link-show btn btn-success' key={q?.id}>show</Link>
                    </div>
                </div>
                ))}

            </div>
    </TabPanel>
    <TabPanel key={'question-tab'}>
    <h1 className="text-center">Done</h1>
            <div className="questions mb-5 mt-5 mx-auto">
                {Object.values(questions).filter(q => Object.values(q.optionOne.votes).includes(authUser?.id) || Object.values(q.optionTwo.votes).includes(authUser?.id)).sort((a,b,) => b.timestamp - a.timestamp).map(q => (
                <div className="card" style={{ width: '18rem' }} key={q?.id}>
                    <img className="card-img-top" src={showAvatar(q.author)} alt="author" />
                    <div className="card-body">
                        <div className="card-info mb-3">
                        <h5 className="card-title">{q.author}</h5>
                        <p className="card-text">{new Date(q.timestamp).toLocaleDateString()}</p>
                        </div>
                        <Link to={`/questions/${q?.id}`} className='link-show btn btn-success' key={q?.id}>show</Link>
                    </div>
                </div>
                ))}

            </div>
    </TabPanel>
  </Tabs>
        </>
    )
}