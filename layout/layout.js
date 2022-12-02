import styles from '../styles/layout.module.css'

export default function Layout({children}){
    return (
        <div className="flex h-screen bg-blue-400">
            <div className="grid w-3/5 m-auto rounded-md bg-slate-50 h-3/4 lg:grid-cols-2">
                    <div className={styles.imgStyle}>
                        <div className={styles.cartoonimg}></div>
                    <div className={styles.cloudone}></div>
                    <div className={styles.cloudtwo}></div>
                    </div>
                <div className="flex flex-col right justify-evenly">
                    <div className="py-10 text-center ">
                        {children}
                    </div>
                </div>

            </div>
        </div>
    )
}