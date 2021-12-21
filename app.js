a = [
    {
        "_id": "61bc9d880e23d4d69e23454b",
        "UserId": "61bc92da5164c6517cc16002",
        "Blog": "In India, people of Hindu religion denotes cow as “cow is our mother”. It is very useful and domestic animal. It is gives us milk, a very healthy, nutritious and complete food. It is found in almost every countries of the world. Cow’s milk is very healthy, nutritious and useful for all members of the family. We drink cow’s milk on daily basis to keep our health good. It is told by the doctors to patients to drink cow milk. It is considered that cow milk is good, healthy and easily digestible food for the newly born babies. It is very gentle animal by nature. It has a large body, four legs, one long tail, two horns, two ears, one mouth, one big nose and one head.",
        "Picture": "pic.jpg",
        "createdAt": "2021-12-17T14:24:08.894Z",
        "updatedAt": "2021-12-17T14:24:08.894Z",
        "__v": 0,
        "WhoCreated": [
            {
                "_id": "61bc92da5164c6517cc16002",
                "user_name": "abhishek",
                "user_email": "abhi@gmail.com",
                "user_gender": "Male",
                "user_profilePic": "post.jpg",
                "user_location": "Ahemdabad",
                "user_password": "$2b$10$TcwPtU7d5rfJXNZAdXmTteAU4wLeCuXeYHKSN51pVLehz.nQ3t3V6",
                "createdAt": "2021-12-17T13:38:34.206Z",
                "updatedAt": "2021-12-17T13:38:34.206Z",
                "__v": 0
            }
        ],
        "comments": [],
        "likes": []
    },
    {
        "_id": "61bcb3099c887ae3eb773238",
        "UserId": "61b5b36e0ee0df44f8cf46ee",
        "Blog": "Cows differ in its shapes, sizes and colours. She eats food, grains, green grasses, fodder and other eatable things. Generally, she is used to of grazing green grasses in the fields. Cow milk is used all over the world to prepare several eatable items and things. We can make curd, dahi, whey, cheese, ghee, butter, various types of sweets, khoya, paneer and so many things from the cow milk. Cow milk is easily digestible and can be eaten by the patients with digestive disorders. Cow milk makes us strong and healthy. It prevents us from various types of infections and diseases. It helps in increasing our immunity power. Cow milk makes our mind sharp and memory strong if we drink regularly.",
        "Picture": "download.jpeg",
        "createdAt": "2021-12-17T15:55:53.276Z",
        "updatedAt": "2021-12-17T15:55:53.276Z",
        "__v": 0,
        "WhoCreated": [
            {
                "_id": "61b5b36e0ee0df44f8cf46ee",
                "user_name": "Kritika Gaur",
                "user_email": "kritika@gmail.com",
                "user_gender": "Female",
                "user_profilePic": "girl-with-laptop-11.jpg",
                "user_location": "Ahemdabad",
                "user_password": "$2b$10$0a5SKg5OazK31srsk8PQ8ucljQ4sBQaLs1TQNHk2DBWBtfCwpga0W",
                "createdAt": "2021-12-12T08:31:42.985Z",
                "updatedAt": "2021-12-17T15:54:29.727Z",
                "__v": 0
            }
        ],
        "comments": [],
        "likes": []
    }
]

// console.log(a.WhoCreated);

a.map(e => {
    console.log(e.WhoCreated[0].user_name);
})