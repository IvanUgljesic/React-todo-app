import React from 'react'
import moment from 'moment'

const Notifications = (props) => {
    const { notifications } = props
    return (      
        <div className="section"> 
            <div className="card z-depth-0">
                <div className="card-content">
                    <h5 className="grey-text text-darken-3">Notifications</h5>
                    <ul>
                    {
                        notifications && notifications.map(note => {
                            return (
                                <li key={note.id}>
                                    <div className="card-body">
                                        <span className="text-dex">{note.user}</span>
                                        <span> - {note.content}</span>
                                    </div>
                                    <div className="grey-text note-date">
                                        { moment(note.time.toDate()).fromNow() }
                                    </div>
                                </li>
                            )
                        } )
                    }
                    </ul>                    
                </div>
            </div>
        </div>   
    )
}

export default Notifications
