const dialogueElement = document.getElementById('dialogue');
const resultElement = document.getElementById('result');
const choicesElement = document.getElementById('choices');
const resetButton = document.getElementById('reset-button');

let affection = 0; // 好感度
let conversationCount = 0; // 会話回数
let canGoToBattle = false; // 出陣可能フラグ

function displayDialogue(dialogue) {
  dialogueElement.innerText = dialogue;
}

function displayResult(result) {
  resultElement.innerText = result;
}

function displayChoices(choices) {
  choicesElement.innerHTML = ''; // 選択肢をクリア

  choices.forEach((choice, index) => {
    const choiceButton = document.createElement('button');
    choiceButton.classList.add('choice');
    choiceButton.innerText = choice.text;
    choiceButton.addEventListener('click', () => handleChoice(index, choice.affection, choice.goToBattle));
    choicesElement.appendChild(choiceButton);
  });
}

function handleChoice(index, affectionChange, goToBattle) {
  affection += affectionChange; // 好感度を変更

  const selectedChoice = currentChoices[index];
  if (selectedChoice.result) {
    displayDialogue(selectedChoice.result);
  }
  if (selectedChoice.nextChoices) {
    currentChoices = selectedChoice.nextChoices;
    displayChoices(currentChoices);
  }

  conversationCount++;

  if (goToBattle && affection >= 2) {
    canGoToBattle = true;
  }

  if (conversationCount >= 3) {
    if (canGoToBattle) {
      if (Math.random() < 0.01) { // 100分の1の確率で失敗する
        displayResult('滅亡');
      } else {
        displayResult('戦に行く');
       // ここに出陣処理を追加する
function goIntoBattle() {
  console.log('出陣します！');
}

if (canGoToBattle) {
  if (Math.random() < 0.01) { // 100分の1の確率で失敗する
    displayResult('滅亡');
  } else {
    displayResult('戦に行く');
    goIntoBattle(); // 出陣処理を呼び出す
  }
}

      }
    } else {
      displayResult('好感度不足のため、戦に行けません！');
      if (affection <= 3) {
        resetButton.style.display = 'block'; // やり直しボタンを表示
      }
    }
  }
}

// 会話シナリオを定義
let currentChoices = [
  {
    text: '信玄: 戦の進言をせよ！',
    result: '部下: 戦は今、好機です！',
    affectionChange: 10, // 好感度変化
    goToBattle: true, // 出陣フラグ
    nextChoices: [
      {
        text: '戦を開始する',
        result: '信玄: なるほど、部下の進言だから、出陣しよう！',
        affectionChange: 100,
      },
      {
        text: 'まだ様子を見る',
        result: '信玄: なるほど、じっと状況を見極めよう。',
        affectionChange: 1000,
      }
    ]
  }
];

// ゲームのステートをリセットする関数
function resetGame() {
  affection = 0;
  conversationCount = 0;
  canGoToBattle = false;
  resetButton.style.display = 'none'; // やり直しボタンを非表示
  displayDialogue('ゲームを始めます。');
  displayChoices(currentChoices);
}

// やり直しボタンの設定
resetButton.innerText = 'やり直し';
resetButton.style.display = 'none'; // 最初は非表示
resetButton.addEventListener('click', resetGame);
document.body.appendChild(resetButton); // ボタンをHTMLに追加

// 最初の対話を表示
displayDialogue('ゲームを始めます。');
displayChoices(currentChoices);
