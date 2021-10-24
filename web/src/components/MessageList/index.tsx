import logoImg from '../../assets/logo.svg'

import styles from './styles.module.scss'

export function MessageList(){
    return(
        <div className={ styles.messageListWrapper }>
            <img src={ logoImg } alt="DoWhile 2021" />

            <ul className={ styles.messageList }>
                <li className={ styles.message }>
                    <p className={ styles.messageContent }>Lorem ipsum dolor sit amet consectetur, adipisicing elit. </p>
                    <div className={ styles.messageUser }>
                        <div className={ styles.userImage }>
                            <img src="https://github.com/yuri-stack.png" alt="Yuri Oliveira" />
                        </div>
                        <span>Yuri Oliveira</span>
                    </div>
                </li>

                <li className={ styles.message }>
                    <p className={ styles.messageContent }>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum aut veniam odio voluptatibus alias quisquam? Impedit odio nostrum non, omnis soluta dicta sit libero sed nemo cumque dolorem optio aut?</p>
                    <div className={ styles.messageUser }>
                        <div className={ styles.userImage }>
                            <img src="https://github.com/yuri-stack.png" alt="Yuri Oliveira" />
                        </div>
                        <span>Yuri Oliveira</span>
                    </div>
                </li>

                <li className={ styles.message }>
                    <p className={ styles.messageContent }>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum aut veniam odio voluptatibus alias quisquam? Impedit odio nostrum non, omnis soluta dicta sit libero sed nemo cumque dolorem optio aut?</p>
                    <div className={ styles.messageUser }>
                        <div className={ styles.userImage }>
                            <img src="https://github.com/yuri-stack.png" alt="Yuri Oliveira" />
                        </div>
                        <span>Yuri Oliveira</span>
                    </div>
                </li>
            </ul>
        </div>
    )
}