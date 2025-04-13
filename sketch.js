let snowflakes = [];
let stars = [];
let buttons = []; // 儲存按鈕的陣列
let projectMenu; // 儲存作品集選單的容器
let iframe; // 用於嵌入網頁的 iframe
let infoBox; // 用於顯示自我介紹的框框
let sprites = {}; // 儲存角色精靈圖
let currentSprite = null; // 當前顯示的精靈圖
let currentFrame = 0; // 當前精靈圖的幀數

function preload() {
  // 預載入角色精靈圖
  sprites = {
    自我介紹: {
      idle: {
        img: loadImage("01.png"),
        width: 217 / 6,
        height: 30,
        frames: 6,
      },
    },
    作品集: {
      idle: {
        img: loadImage("02.png"),
        width: 127 / 3,
        height: 59,
        frames: 3,
      },
    },
    測驗卷: {
      idle: {
        img: loadImage("03.png"),
        width: 130 / 3,
        height: 49,
        frames: 3,
      },
    },
    教學影片: {
      idle: {
        img: loadImage("04.png"),
        width: 51 / 2,
        height: 25,
        frames: 2,
      },
    },
  };
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // 星星初始化
  for (let i = 0; i < 100; i++) {
    stars.push({
      x: random(width),
      y: random(height / 2),
      size: random(1, 3),
    });
  }

  // 建立主按鈕
  let buttonNames = ["自我介紹", "作品集", "測驗卷", "教學影片", "筆記"];
  let buttonWidth = 120;
  let buttonHeight = 40;
  let spacing = 10;
  let startX = 20;
  let startY = 20;

  for (let i = 0; i < buttonNames.length; i++) {
    let btn = createButton(buttonNames[i]);
    btn.position(startX + i * (buttonWidth + spacing), startY);
    btn.size(buttonWidth, buttonHeight);
    btn.style("font-size", "16px");
    btn.style("background-color", "#4CAF50");
    btn.style("color", "white");
    btn.style("border", "none");
    btn.style("border-radius", "5px");
    btn.style("cursor", "pointer");
    buttons.push(btn);

    // 設定滑鼠移入與移出事件
    btn.mouseOver(() => showSprite(buttonNames[i]));
    btn.mouseOut(() => hideSprite());

    if (buttonNames[i] === "作品集") {
      btn.mousePressed(() => toggleProjectMenu(btn.x, btn.y + buttonHeight, buttonWidth));
    } else {
      btn.mousePressed(() => handleDirectButton(buttonNames[i]));
    }
  }
}

function toggleProjectMenu(x, y, width) {
  // 如果選單已經顯示，則移除
  if (projectMenu) {
    projectMenu.remove();
    projectMenu = null;
    return;
  }

  // 建立選單容器
  projectMenu = createDiv();
  projectMenu.style("position", "absolute");
  projectMenu.style("background-color", "#FFFFFF");
  projectMenu.style("border", "1px solid #CCCCCC");
  projectMenu.style("border-radius", "5px");
  projectMenu.style("box-shadow", "0px 4px 8px rgba(0, 0, 0, 0.2)");
  projectMenu.style("padding", "10px");
  projectMenu.style("width", `${width}px`);
  projectMenu.position(x, y);

  // 建立選單選項
  let projectNames = ["1", "2", "3"];
  let projectLinks = [
    "https://mercy94326.github.io/20250310-2/",
    "https://mercy94326.github.io/20250317/",
    "https://mercy94326.github.io/20241223./",
  ];

  for (let i = 0; i < projectNames.length; i++) {
    let option = createButton(projectNames[i]);
    option.parent(projectMenu);
    option.style("display", "block");
    option.style("width", "100%");
    option.style("margin", "5px 0");
    option.style("padding", "10px");
    option.style("background-color", "#F0F0F0");
    option.style("color", "#000000");
    option.style("border", "none");
    option.style("border-radius", "5px");
    option.style("cursor", "pointer");
    option.mousePressed(() => handleProjectButton(projectLinks[i]));
  }
}

function handleProjectButton(link) {
  let iframe = document.getElementById("embeddedFrame");
  iframe.style.display = "block";
  iframe.src = link;

  // 移除選單
  if (projectMenu) {
    projectMenu.remove();
    projectMenu = null;
  }
}

function handleDirectButton(name) {
  // 如果是自我介紹，顯示框框
  if (name === "自我介紹") {
    if (!infoBox) {
      // 建立框框
      infoBox = createDiv();
      infoBox.style("position", "absolute");
      infoBox.style("width", "400px");
      infoBox.style("height", "200px");
      infoBox.style("background-color", "#FFFFFF");
      infoBox.style("color", "#000000");
      infoBox.style("border", "2px solid #CCCCCC");
      infoBox.style("border-radius", "10px");
      infoBox.style("padding", "20px");
      infoBox.style("text-align", "center");
      infoBox.style("font-size", "16px");
      infoBox.style("box-shadow", "0px 4px 8px rgba(0, 0, 0, 0.2)");
      infoBox.position(width / 2 - 200, height / 2 - 100); // 視窗中間

      // 加入文字內容
      let text = createP("大家好，我是陳筱詩，桃園人，高中的時候就讀大溪高中，興趣是看電影及旅遊。");
      text.parent(infoBox);
      text.style("margin", "0");
      text.style("padding", "0");

      // 建立關閉按鈕
      let closeButton = createButton("關閉");
      closeButton.parent(infoBox);
      closeButton.style("margin-top", "20px");
      closeButton.style("padding", "10px 20px");
      closeButton.style("background-color", "#FF4C4C");
      closeButton.style("color", "white");
      closeButton.style("border", "none");
      closeButton.style("border-radius", "5px");
      closeButton.style("cursor", "pointer");
      closeButton.mousePressed(() => {
        infoBox.remove(); // 移除框框
        infoBox = null; // 重置 infoBox
      });
    }
  } else {
    // 如果是其他按鈕，處理 iframe
    let iframe = document.getElementById("embeddedFrame");
    iframe.style.display = "block";

    switch (name) {
      case "測驗卷":
        iframe.src = "https://mercy94326.github.io/0413/";
        break;
      case "教學影片":
        iframe.src = "https://cfchen58.synology.me/程式設計2024/B2/week1/20250217_092821.mp4";
        break;
      case "筆記":
        iframe.src = "https://hackmd.io/@o7VA6dSlRTCn9P57NkzKZw/B1r0ELY0ke";
        break;
      default:
        iframe.style.display = "none";
        iframe.src = "";
    }
  }
}

function showSprite(buttonName) {
  // 顯示對應的精靈圖
  currentSprite = sprites[buttonName]?.idle || null;
  currentFrame = 0; // 重置幀數
}

function hideSprite() {
  // 隱藏精靈圖
  currentSprite = null;
}

function draw() {
  drawBackground();

  let treeCount = 8;
  let treeWidth = width / treeCount;
  for (let i = 0; i < treeCount; i++) {
    let x = i * treeWidth + treeWidth / 2;
    drawChristmasTree(x, height - 50, treeWidth / 2);
  }

  drawSnowflakes();

  // 畫精靈圖
  if (currentSprite) {
    let frameX = currentFrame * currentSprite.width;
    image(
      currentSprite.img,
      width - currentSprite.width - 20, // 右上角位置
      20, // 距離畫面頂部 20px
      currentSprite.width,
      currentSprite.height,
      frameX,
      0,
      currentSprite.width,
      currentSprite.height
    );

    // 更新幀數
    if (frameCount % 5 === 0) {
      currentFrame = (currentFrame + 1) % currentSprite.frames;
    }
  }
}

function drawBackground() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(0, 0, 50), color(0, 50, 150), inter);
    stroke(c);
    line(0, y, width, y);
  }

  noStroke();
  fill(255);
  for (let star of stars) {
    ellipse(star.x, star.y, star.size);
  }
}

function drawChristmasTree(x, y, size) {
  noStroke();
  fill(34, 139, 34);
  triangle(x - size, y, x + size, y, x, y - size * 2);
  triangle(x - size * 0.8, y - size * 0.5, x + size * 0.8, y - size * 0.5, x, y - size * 2);
  triangle(x - size * 0.6, y - size, x + size * 0.6, y - size, x, y - size * 2);
  triangle(x - size * 0.4, y - size * 1.5, x + size * 0.4, y - size * 1.5, x, y - size * 2);

  fill(139, 69, 19);
  rect(x - size / 6, y, size / 3, size / 2);
}

function drawSnowflakes() {
  snowflakes.push({
    x: random(width),
    y: 0,
    size: random(2, 5),
    speed: random(1, 3),
  });

  for (let i = snowflakes.length - 1; i >= 0; i--) {
    let s = snowflakes[i];
    fill(255);
    noStroke();
    ellipse(s.x, s.y, s.size);
    s.y += s.speed;
    if (s.y > height) {
      snowflakes.splice(i, 1);
    }
  }
}
