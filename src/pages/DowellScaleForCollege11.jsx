import './style.css'
import Card from '../Components/Card'

const DowellScaleForCollege = () => {
  
  return (
    <div className='homePage'>
       <img src='https://i0.wp.com/dowellresearch.de/wp-content/uploads/2023/04/true-moments-logo-1-1-442919954-1538479590775-1.webp?w=382&ssl=1' alt='dowelllogo' />
    <div className='cards'>
      {/* <div className='firstCard'>
        <h1>How do you want to rate this post?</h1>
        <ul>
            <li>Attendance</li>
            <li>Reading</li>
            <li>Understanding</li>
            <li>Explaining</li>
            <li>Applying</li>
        </ul>
      </div> */}
      <Card 
      question="Did you attend the classes regularly"
      link1="https://100035.pythonanywhere.com/addons/create-response/v3/?user=True&scale_type=nps_lite&channel=channel_1&instance=instance_1&workspace_id=653637a4950d738c6249aa9a&username=CustomerSupport&scale_id=6645f30f1cddfeac941274cb&item=0"
      link2="https://100035.pythonanywhere.com/addons/create-response/v3/?user=True&scale_type=nps_lite&channel=channel_1&instance=instance_1&workspace_id=653637a4950d738c6249aa9a&username=CustomerSupport&scale_id=6645f30f1cddfeac941274cb&item=1"
      link3="https://100035.pythonanywhere.com/addons/create-response/v3/?user=True&scale_type=nps_lite&channel=channel_1&instance=instance_1&workspace_id=653637a4950d738c6249aa9a&username=CustomerSupport&scale_id=6645f30f1cddfeac941274cb&item=2"
      image="https://media.discordapp.net/attachments/1108341894162952192/1240681677236342795/question1.png?ex=6647725a&is=664620da&hm=51cd8ed27daefd61a44ad97c4e68e40c53d04964bbd5b36d06cd6c68e1035afc&=&format=webp&quality=lossless&width=463&height=395" />
      <Card 
      question="Do you feel you need more reading or explanation on the topic?"
      link1="https://100035.pythonanywhere.com/addons/create-response/v3/?user=True&scale_type=nps_lite&channel=channel_1&instance=instance_2&workspace_id=653637a4950d738c6249aa9a&username=CustomerSupport&scale_id=6645f30f1cddfeac941274cb&item=0"
      link2="https://100035.pythonanywhere.com/addons/create-response/v3/?user=True&scale_type=nps_lite&channel=channel_1&instance=instance_2&workspace_id=653637a4950d738c6249aa9a&username=CustomerSupport&scale_id=6645f30f1cddfeac941274cb&item=1"
      link3="https://100035.pythonanywhere.com/addons/create-response/v3/?user=True&scale_type=nps_lite&channel=channel_1&instance=instance_2&workspace_id=653637a4950d738c6249aa9a&username=CustomerSupport&scale_id=6645f30f1cddfeac941274cb&item=2"
      image="https://media.discordapp.net/attachments/1108341894162952192/1240681677479608411/question2.png?ex=6647725a&is=664620da&hm=fb0a5f1f72f053bcd8adfb56ea3f5f153e056f7879ad4bc16a350ae28eab2aef&=&format=webp&quality=lossless" />
      <Card 
      question="Did you understand the topic well?"
      link1="https://100035.pythonanywhere.com/addons/create-response/v3/?user=True&scale_type=nps_lite&channel=channel_1&instance=instance_3&workspace_id=653637a4950d738c6249aa9a&username=CustomerSupport&scale_id=6645f30f1cddfeac941274cb&item=0"
      link2="https://100035.pythonanywhere.com/addons/create-response/v3/?user=True&scale_type=nps_lite&channel=channel_1&instance=instance_3&workspace_id=653637a4950d738c6249aa9a&username=CustomerSupport&scale_id=6645f30f1cddfeac941274cb&item=1"
      link3="https://100035.pythonanywhere.com/addons/create-response/v3/?user=True&scale_type=nps_lite&channel=channel_1&instance=instance_3&workspace_id=653637a4950d738c6249aa9a&username=CustomerSupport&scale_id=6645f30f1cddfeac941274cb&item=2" 
      image="https://media.discordapp.net/attachments/1108341894162952192/1240681677739524116/question3.png?ex=6647725a&is=664620da&hm=f40f6200f0a622e15f90289ef4e42e66485c7dff3826e6cda4e214e45a216b56&=&format=webp&quality=lossless&width=405&height=395"/>
      <Card 
      question="Do you feel confident explaining the topic to your friends/classmates?"
      link1="https://100035.pythonanywhere.com/addons/create-response/v3/?user=True&scale_type=nps_lite&channel=channel_1&instance=instance_4&workspace_id=653637a4950d738c6249aa9a&username=CustomerSupport&scale_id=6645f30f1cddfeac941274cb&item=0"
      link2="https://100035.pythonanywhere.com/addons/create-response/v3/?user=True&scale_type=nps_lite&channel=channel_1&instance=instance_4&workspace_id=653637a4950d738c6249aa9a&username=CustomerSupport&scale_id=6645f30f1cddfeac941274cb&item=1"
      link3="https://100035.pythonanywhere.com/addons/create-response/v3/?user=True&scale_type=nps_lite&channel=channel_1&instance=instance_4&workspace_id=653637a4950d738c6249aa9a&username=CustomerSupport&scale_id=6645f30f1cddfeac941274cb&item=2"
      image="https://media.discordapp.net/attachments/1108341894162952192/1240681678142312518/question4.png?ex=6647725a&is=664620da&hm=a4c502850d894c3bb8eebfbf4a04bc78999bd073252272f3da923871a793be16&=&format=webp&quality=lossless" />
      <Card 
      question="Can you apply what you understood in real life or role plays?"
      link1="https://100035.pythonanywhere.com/addons/create-response/v3/?user=True&scale_type=nps_lite&channel=channel_1&instance=instance_5&workspace_id=653637a4950d738c6249aa9a&username=CustomerSupport&scale_id=6645f30f1cddfeac941274cb&item=0"
      link2="https://100035.pythonanywhere.com/addons/create-response/v3/?user=True&scale_type=nps_lite&channel=channel_1&instance=instance_5&workspace_id=653637a4950d738c6249aa9a&username=CustomerSupport&scale_id=6645f30f1cddfeac941274cb&item=1"
      link3="https://100035.pythonanywhere.com/addons/create-response/v3/?user=True&scale_type=nps_lite&channel=channel_1&instance=instance_5&workspace_id=653637a4950d738c6249aa9a&username=CustomerSupport&scale_id=6645f30f1cddfeac941274cb&item=2"
      image="https://media.discordapp.net/attachments/1108341894162952192/1240681678414938174/question5.png?ex=6647725a&is=664620da&hm=6ca494f3ef3713f756a9c7b4e4b2f8f2221a7bee357558f70f80846c25448b85&=&format=webp&quality=lossless" />
      </div>
      
    </div>
  )
}

export default DowellScaleForCollege
