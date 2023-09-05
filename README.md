
###### tags: `database`  `database system`

  

# Example Project Environment deployment

  


## Pre-step

### Download the required software

- Please download and install the following software first:

- [Node.js (Choose the one with LTS)](https://nodejs.org/en/) for frontend

- [XAMPP (version 7.2.27)](https://www.apachefriends.org/download.html) for backend

- [vs code (Optional)](https://code.visualstudio.com/) for coding

### Install

##### *(If you have already installed them, you can skip this step.)*

**XAMPP**
1.
 ![](https://i.imgur.com/sQVWFaT.png)

2.
![](https://i.imgur.com/tEAx3hr.png)

3.
![](https://i.imgur.com/EHXX9yJ.png)

4.
![](https://i.imgur.com/QgEIgMX.png)

5.
![](https://i.imgur.com/pPGQsIt.png)

6.
![](https://i.imgur.com/W2nQ44c.png)

7.
![](https://i.imgur.com/bG7zSkw.png)

8.
![](https://i.imgur.com/DicRQnK.png)

9.
![](https://i.imgur.com/7LAC1gn.png)

10.
![](https://i.imgur.com/MVzzXjr.png)

11.
![](https://i.imgur.com/hVBMH33.png)
***
**Node.js**

1.
 ![](https://i.imgur.com/drKjZOF.png)

2.
![](https://i.imgur.com/JetDUT2.png)

3.
![](https://i.imgur.com/QpgS5Rw.png)

4.
![](https://i.imgur.com/K8hQBBo.png)

5.
![](https://i.imgur.com/FoAtxdG.png)

6.
![](https://i.imgur.com/50MzUQD.png)

7.
![](https://i.imgur.com/SXn9R8h.png)

8.
![](https://i.imgur.com/b5K9VyW.png)

9.
![](https://i.imgur.com/KARcENX.png)

10.
![](https://i.imgur.com/Nf0NlG5.png)

11.
![](https://i.imgur.com/G9ZquB3.png)

12.
![](https://i.imgur.com/Y1bTq2Q.png)

13.
![](https://i.imgur.com/K4Ck2Hj.png)

14. Check if the installation is successful

- click `start` (not that circle) and then type `powershell`, click `Run as Administrator`

- ![](https://i.imgur.com/HcRhxsH.png)

- If the version number appears after entering these two commands, `npm -v` and `node -v`, it means the installation is successful!

![](https://i.imgur.com/u2dHRz2.png)

- In my case, I am using node.js `v12.16.3` and the version number is based on the installer you downloaded.
***
  
 
 **vs code**


#### *Please download the latest version from the official website.*


1.
 ![](https://i.imgur.com/MhTzzHK.png)

2.
![](https://i.imgur.com/CbM3v1Q.png)

3.
![](https://i.imgur.com/89MCiZ6.png)

4.
![](https://i.imgur.com/5GR7QeG.png)

5.
![](https://i.imgur.com/cq6wJhB.png)

6.
![](https://i.imgur.com/VXlOBqa.png)

7.
![](https://i.imgur.com/MnrHseS.png)

8.
![](https://i.imgur.com/8JXb4eF.png)

9.
![](https://i.imgur.com/2auh5V0.png)
* * *


## Project Environment Configuration

### 1. Deploy the backend


  **move code to the htdocs**



1. open `XAMPP Control Panel` as administrator

  

![](https://i.imgur.com/TBfDGk8.png)

2. click Explorer

  

![](https://i.imgur.com/udbNex9.png)

3. find the `htdocs` folder and enter (the default path is in: `C:\xampp`)

  

![](https://i.imgur.com/JuSyYyZ.png)

4. delete them or move them to the location you want (p.s these files are not important)

  

![](https://i.imgur.com/VxjabQj.png)

5. copy the backend source code to the htdocs folder. You will copy：

- db_sql_script

- img

- php

- README.md (optional)

  

![](https://i.imgur.com/YCi7zyO.png)

6. check the backend file structure, and detail [see here](#Backend-file-structure)

  

![](https://i.imgur.com/3lWmhfa.png)


**start server and import DB tables and init data**



1. return to the `XAMPP Control Panel`, and start the `Apache` and `MySql`

![](https://i.imgur.com/OXYDRoC.png)

2. allow

![](https://i.imgur.com/6HBlIwc.png)

3. open the database management interface:

  

![](https://i.imgur.com/JiFhLiQ.png)

4. you can change the language from here

  

![](https://i.imgur.com/fmjZrXF.png)

5. import database

![](https://i.imgur.com/WsmCSIw.png)

6.
![](https://i.imgur.com/oCf7EPK.png)

7.
![](https://i.imgur.com/LFZJJa4.png)

8. go to `C:\xampp\htdocs`, and enter the `db_sql_script` folder

  

![](https://i.imgur.com/OesBd1Z.png)

9. select the `init_db.sql` file, and Open

  

![](https://i.imgur.com/cB96zzo.png)

10. click `Go` Button

  

![](https://i.imgur.com/kcwyn9l.png)

11. import result

  

![](https://i.imgur.com/BJ4iYpL.png)

![](https://i.imgur.com/zwJH3og.png)

***

  

### 2. Deploy the frontend

Vue.js reference:

- [Official documents](https://vuejs.org/v2/guide/)

- [tutorial1](https://www.tutorialspoint.com/vuejs/index.htm)

- [tutorial2](https://bytutorial.com/tutorials/vuejs)

- [官方文件](https://vuejs.bootcss.com/guide/)

- [教學文章1](https://ithelp.ithome.com.tw/articles/10184750)

- [教學文章2](https://medium.com/@rorast.power.game/vue-js%E7%B3%BB%E5%88%97%E4%B8%80-%E5%85%A5%E9%96%80%E7%AF%87-9d131c9f3d39)

**install the required packages for the front end**


1. use `vs code` open the frontend project

  

![](https://i.imgur.com/0da4mEI.png)

  

![](https://i.imgur.com/4lU8YJG.png)

  

2. open terminal

  

![](https://i.imgur.com/nGV0423.png)

  

![](https://i.imgur.com/1PrjWD3.png)

  

3. type `npm install -g @vue/cli` in the terminal, then Enter

  

![](https://i.imgur.com/GonG5f0.png)

  

4. wait for the installation of the vue cli package to complete

  

![](https://i.imgur.com/sHzx2OW.png)

  

5. done

  

![](https://i.imgur.com/CFJcQ7h.png)

  

6. and then type `npm install` to install the required package

  

![](https://i.imgur.com/LlEhtuX.png)

![](https://i.imgur.com/NZg5QIp.png)

7. done

  

![](https://i.imgur.com/N6TrEV8.png)


**run the frontend server**


1. type `npm run serve` to start the frontend server

  

![](https://i.imgur.com/yt5uNWg.png)

  

![](https://i.imgur.com/SI0fprb.png)

  

![](https://i.imgur.com/yc5Fz6n.png)

  

![](https://i.imgur.com/FTIAf0q.png)

  

2. running

  

![](https://i.imgur.com/rSXzDO8.png)




  

3. use `ctrl` + mouse left button to open the link, or type the url `http://localhost:8080/` in the browser by yourself.


don't use the IP url to open it, it will not work


![](https://i.imgur.com/zBDJq6n.png)


**the backend project is not complete. so please refer to the following chapter(Demo video) to complete it.**
***
  

## Demo Video

After you have completed the previous steps, the entire project is not complete. You need to write some SQL code in the corresponding file according to the following demonstration videos:

1. as a buyer, I want to browse the products so that I can see what I am interested in.

  

- Related code:

- login.php [getwallet]

- home.php [getproductdata、getproductcategories]

[Scenario 1 video](https://youtu.be/m2cWthv0pes?si=cDV5KCxIhMGe3QG9)

***

  
  

2. as a buyer, I want to buy the products so that I can drink.

- Related code:

- shoppingCart.php [getcoupon]

- purchaseshoppingcart.php [purchaseshoppingcart]

- login.php [updatewallet、getwallet]

[Scenario 2 video](https://youtu.be/Z7eOB-dOuAQ)
***


3. as a seller, I want to process the order so that I can sell the products and make money

- Related code:

- processorder.php [getorderno、processorder、getsalesamount、updateorder、updateprofit、]

- orderrecord.php [getOrderlist]

- login.php [getprofit]

[Scenario 3 video](https://youtu.be/b-imlNgPjnQ)
***


4. as a seller, I want to manage product inventory so that I can know the inventory status of the product

- Related code:

- myproduct.php [getmyproduct、replenishment]

[Scenario 4 video](https://youtu.be/NI7PM7qNAJA)
***



5. as a seller, I want to manage the product's on and off shelves so that I can manage my produxts

- Related code:

- myproduct.php [getmyproduct、offproduct、launchproduct]

[Scenario 5 video](https://youtu.be/3WmCNZU2PV0)
***


6. as a seller, I want to add new products so that I can diversify my products

- Related code:

- home.php [getproductcategories]

- uploadFile.php

- publish.php [publish]

- myproduct.php [getmyproduct]


[Scenario 6 video](https://youtu.be/Pxk5JwcPHf8)
***
This is an implementation example of user story 1:

- getwallet

![](https://i.imgur.com/ab7VjuA.png)

- getproductdata

![](https://i.imgur.com/ZLg9bO1.png)

- getproductcategories

  

![](https://i.imgur.com/UbgwYkM.png)

  
  

## Other

### Default Account

- buyer

- account: buyer@example.com

- password: buyer

- seller

- account: seller@example.com

- password: seller

  

### DBMS config

1. go to here: `C:\xampp\htdocs`

2. open with `Code` (*right-click on the blank space*)

  

![](https://i.imgur.com/duDN6vA.png)

3. open `php/database.php`, and modify the `$username` and `$password` to your DB **account** and **password**

![](https://i.imgur.com/VLL2WEY.png)

4. import the `init_db.sql` to your DBMS. For example, use MySql Workbanch:

  

![](https://i.imgur.com/snwdIeD.png)

![](https://i.imgur.com/GLabBxG.png)

![](https://i.imgur.com/VUPqTYA.png)

![](https://i.imgur.com/2v67o3n.png)

  

![](https://i.imgur.com/PuXz1Wz.png)

  

### Backend file structure

```

htdocs

├── db_sql_script

│ └── init_db.sql // creat table、insert date ...

├── img // folder where pictures are stored

│ └── *.jpg

├── php // backend cdoe

│ ├── database.php // connect to DBMS

│ ├── headers.php

│ ├── myproduct.php // manage product

│ ├── processorder.php // manage order

│ ├── shoppingCart.php // process the "purchase" operation, and the shopping cart's state is stored in frontend, so don't care "shopping cart"

│ ├── home.php

│ ├── login.php

│ ├── orderrecord.php // manage order record

│ ├── publish.php // add new product

│ └── uploadFile.php // upload product's image

└── README.md

```

  

### Frontend file structure

```

109-2-database-project-frontend-example

├── node_modules

│ └── packages...

├── public

│ ├── index.html

│ └── favicon.ico

├── src

│ ├── assets

│ │ └── logo.png

│ ├── config

│ │ └── config.js

│ ├── store

│ │ ├── modules

│ │ │ ├── login.js

│ │ │ ├── products.js

│ │ │ ├── shoppingCart.js

│ │ │ └── walletProfit.js

│ │ └── index.js

│ ├── api

│ │ ├── home.js

│ │ ├── myproduct.js

│ │ ├── processorder.js

│ │ ├── walletOrProfit.js

│ │ ├── login.js

│ │ ├── order.js

│ │ └── shoopingCart.js

│ ├── components

│ │ ├── CartItems.vue

│ │ ├── Coupon.vue

│ │ ├── Loading.vue

│ │ ├── Navbar.vue

│ │ └── Replenishment.vue

│ ├── img

│ │ ├──coupon.jpg

│ │ └── logo.png

│ ├── router

│ │ └── index.js

│ ├── views

│ │ ├── Deposit.vue

│ │ ├── Login.vue

│ │ ├── NewProduct.vue

│ │ ├── ProcessOrder.vue

│ │ ├── Home.vue

│ │ ├── MyProduct.vue

│ │ ├── OrderRecord.vue

│ │ └── ShoppingCart.vue

│ ├── App.vue

│ └── main.js

├── .gitignore

├── babel.config.js

├── package.json

├── package-lock.json

└── README.md

```

  

```

team02

├── code

│ ├── frontend.zip

│ ├── backend.zip

(如果沒有前後端分離，那就只需壓縮為 {任意名稱}.zip)

│ └── README.md (簡單描述部屬步驟)

├── final_report.pdf

└── final.pptx

```