let state;
const title=document.getElementById("title");
const game=document.getElementById("game");
const mapEl=document.getElementById("map");
const contextEl=document.getElementById("contextline");
const exitLineEl=document.getElementById("exitline");
const roomdescEl=document.getElementById("roomdesc");
const responseEl=document.getElementById("response");
const logEl=responseEl;
const cmd=document.getElementById("cmd");
const inventoryEl=document.getElementById("inventory");
const finishedBarEl=document.getElementById("finishedBar");
const playAgainBtn=document.getElementById("playAgainBtn");

function freshState(){
  return {
    room:"start",
    dead:false,
    awaiting:null,
    boxOpened:false,
    boxContents:["BRASS BELL","PIECE OF STRING","HALF AN APPLE"],
    inventory:[],
    dropped:{},
    wellBellLowered:false,
    hookWeighted:false,
    secretOpen:false,
    creaturePhase:"initial",
    treeBellEvent:false,
    mirrorTouched:false,
    chairSat:false,
    boardMarble:false,
    rainDrank:false,
    hatchOpen:false,
    atPrototypeEnd:false,
    roomDescSource:"enter"
  };
}

function prototypeEndingLines(){
  return [
    "",
    "YOU HAVE REACHED THE EDGE OF THE WORLD.",
    "",
    "OR AT LEAST THE PART OF IT",
    "THAT EXISTS YET.",
    "",
    "WAMPUS THE WOMBAT IS AN EARLY PROTOTYPE.",
    "",
    "THANKS FOR PLAYING."
  ];
}

function getAvailableExits(){
  const r=ROOMS[state.room];
  const ex={};
  if(r.exits.N) ex.N=true;
  if(r.exits.S) ex.S=true;
  if(r.exits.E) ex.E=true;
  if(r.exits.W) ex.W=true;
  if(r.exits.U) ex.U=true;
  if(r.exits.D) ex.D=true;
  if(state.room==="hookroom" && state.secretOpen) ex.E=true;
  if(state.room==="boardroom" && state.hatchOpen) ex.D=true;
  return ex;
}

const EXIT_NAMES={N:"NORTH",S:"SOUTH",E:"EAST",W:"WEST",U:"UP",D:"DOWN"};
const EXIT_ORDER=["N","S","E","W","U","D"];

function buttonReachable(){
  if(has("BLACK BUTTON")) return true;
  return state.room==="belowroom" && droppedHere().includes("BLACK BUTTON");
}

function normalizeCommandInput(input){
  return input.replace(/\bTHE\b/g," ").replace(/\bA\b/g," ").replace(/\s+/g," ").trim();
}

function isBoardMarbleCommand(input){
  const known=[
    "PUT MARBLE IN BOARD","PUT MARBLE IN CUP","PLACE MARBLE IN CUP",
    "PUT MARBLE IN HOLE","PLACE MARBLE IN HOLE","PLACE MARBLE IN BOARD",
    "PUT MARBLE IN THE CUP","PLACE MARBLE IN THE CUP","PUT MARBLE IN THE HOLE",
    "USE MARBLE ON BOARD","USE MARBLE WITH BOARD"
  ];
  if(known.includes(input)) return true;
  const loose=normalizeCommandInput(input);
  if(known.map(normalizeCommandInput).includes(loose)) return true;
  return /^(PUT|PLACE)\s+(?:CLAY\s+)?MARBLE\s+(?:IN|INTO)\s+(?:FIRST\s+)?(?:CUP|CUPS|BOARD|HOLE)\s*$/.test(loose)
    || /^USE\s+(?:CLAY\s+)?MARBLE\s+(?:ON|WITH)\s+BOARD\s*$/.test(loose);
}

function roomArt(id){
  let base;

  if(id==="box"){
    base=[...(state.boxOpened ? ROOMS.box.artOpen : ROOMS.box.artClosed)];
  } else if(id==="hookroom"){
    base=[...(state.secretOpen ? ROOMS.hookroom.artOpen : ROOMS.hookroom.artClosed)];
  } else if(id==="boardroom"){
    base=[...(state.hatchOpen ? ROOMS.boardroom.artHatch : ROOMS.boardroom.art)];
  } else if(id==="creature"){
    if(state.creaturePhase==="marbleTaken"){
      base=[...ROOMS.creature.artEmpty];
    } else if(droppedHere().includes("CLAY MARBLE")){
      base=[...ROOMS.creature.artMarble];
    } else if(state.creaturePhase==="fledShout" || state.creaturePhase==="fledQuiet"){
      base=[...ROOMS.creature.artEmpty];
    } else {
      base=[...ROOMS.creature.artInitial];
    }
  } else {
    base=[...ROOMS[id].art];
  }

  if(droppedHere().length){
    base.push("", "              ·");
  }
  return base;
}

function boxContentsText(){
  if(state.boxContents.length===0) return ["THE BOX IS OPEN.","","IT IS EMPTY."];
  return ["THE BOX IS OPEN.","","IT CONTAINS:","",...state.boxContents.map(x=>"        "+x)];
}

function roomText(id){
  if(id==="box" && state.boxOpened) return boxContentsText();

  if(id==="creature"){
    if(state.creaturePhase==="initial"){
      return [
        "SOMETHING SMALL AND FURRY",
        "IS CROUCHED NEAR THE EAST WALL.",
        "",
        "YOU CANNOT SEE ITS FACE.",
        "",
        "A CLAY MARBLE RESTS BESIDE IT."
      ];
    }
    if(state.creaturePhase==="fledShout"){
      return [
        "THE FURRY THING FLINCHED AT THE SOUND.",
        "",
        "IT BOLTED OUT OF SIGHT.",
        "",
        "THE CLAY MARBLE IS STILL HERE."
      ];
    }
    if(state.creaturePhase==="fledQuiet"){
      const here=droppedHere().includes("CLAY MARBLE");
      return here ? [
        "THE FURRY THING IS GONE.",
        "",
        "A CLAY MARBLE ROLLS",
        "IN A SLOW CIRCLE.",
        "",
        "IT SHOULD HAVE STOPPED BY NOW."
      ] : [
        "THE FURRY THING IS GONE.",
        "",
        "THE PASSAGE IS QUIET NOW."
      ];
    }
    return ["THE PASSAGE IS QUIET NOW."];
  }

  const base=[...ROOMS[id].text];
  const dropped=droppedHere();
  if(dropped.length){
    base.push("","ON THE FLOOR:  " + dropped.join(" · "));
  }
  return base;

}

function updateInventory(){
  const slots=[...state.inventory];
  while(slots.length<3) slots.push("—");
  const short=slots.map(x=>({
    "BRASS BELL":"BELL",
    "PIECE OF STRING":"STRING",
    "HALF AN APPLE":"HALF APPLE",
    "CLAY MARBLE":"MARBLE",
    "BELL ON STRING":"BELL+STRING",
    "BRASS KEY":"KEY",
    "BRASS TAG":"TAG",
    "CLOTH BAG":"BAG",
    "BLACK BUTTON":"BUTTON"
  }[x] || x));
  inventoryEl.textContent="CARRYING:  [ " + short.join(" ]  [ ") + " ]";
}

function roomTitleText(){
  const names={
    start:"SMALL STONE ROOM",
    corridor:"CROSS PASSAGE",
    well:"WELL ROOM",
    box:"BOX ROOM",
    stairs:"NARROW PASSAGE",
    creature:"FURRY THING",
    hookroom:"TILED ROOM",
    beyond:"TREE ROOM",
    rainroom:"RAIN ROOM",
    mirrorroom:"MIRROR ROOM",
    chairroom:"CHAIR ROOM",
    boardroom:"BOARD ROOM",
    belowroom:"UNDER THE BOARD"
  };
  return names[state.room]||"UNKNOWN";
}

function exitLineText(){
  const ex=getAvailableExits();
  const labels=EXIT_ORDER.filter(d=>ex[d]).map(d=>EXIT_NAMES[d]);
  return "EXITS: " + (labels.join(" · ") || "—");
}

function setRoomDescription(lines){
  const display=Array.isArray(lines)?lines:[String(lines)];
  roomdescEl.textContent=display.join("\n");
}

function setResponse(lines){
  if(lines===null || lines===undefined || lines===""){
    responseEl.textContent="";
    return;
  }
  const display=Array.isArray(lines)?lines:[String(lines)];
  responseEl.textContent=display.join("\n");
}

function renderFrame(){
  updateInventory();
  mapEl.textContent=roomArt(state.room).join("\n");
  contextEl.textContent=roomTitleText();
  exitLineEl.textContent=exitLineText();
}

function show(arrivalLines=null){
  state.roomDescSource="enter";
  renderFrame();
  setRoomDescription(roomText(state.room));
  setResponse(arrivalLines);
  if(finishedBarEl) finishedBarEl.classList.add("hidden");
  cmd.focus();
}

function setPrototypeCompleteMode(on){
  if(!game) return;
  game.classList.toggle("prototype-complete",!!on);
}

function message(lines){
  renderFrame();
  if(state.awaiting==="complete" || state.atPrototypeEnd){
    setRoomDescription("");
    setPrototypeCompleteMode(true);
    setResponse(lines);
    if(finishedBarEl) finishedBarEl.classList.remove("hidden");
  } else {
    if(state.roomDescSource!=="look") setRoomDescription(roomText(state.room));
    setResponse(lines);
  }
  cmd.focus();
}

function lookRefresh(){
  state.roomDescSource="look";
  renderFrame();
  setRoomDescription(roomLook(state.room));
  setResponse("");
  cmd.focus();
}

function completePrototype(lines){
  state.atPrototypeEnd=true;
  state.awaiting="complete";
  setPrototypeCompleteMode(true);
  renderFrame();
  setRoomDescription("");
  setResponse(lines);
  if(finishedBarEl) finishedBarEl.classList.remove("hidden");
  cmd.focus();
}

function restartGame(){
  state=freshState();
  setPrototypeCompleteMode(false);
  if(finishedBarEl) finishedBarEl.classList.add("hidden");
  show();
}

function startGame(){
  title.classList.add("hidden");
  game.classList.remove("hidden");
  restartGame();
}

function resolveArrowMove(key){
  const ex=getAvailableExits();
  if(key==="ArrowUp"){
    if(ex.N) return "N";
    if(ex.U) return "U";
  }
  if(key==="ArrowDown"){
    if(ex.S) return "S";
    if(ex.D) return "D";
  }
  if(key==="ArrowLeft" && ex.W) return "W";
  if(key==="ArrowRight" && ex.E) return "E";
  return null;
}

function move(dir){
  if(state.dead || state.awaiting==="complete") return;
  let dest=ROOMS[state.room].exits[dir];

  if(state.room==="hookroom" && dir==="E" && state.secretOpen) dest="beyond";
  if(state.room==="boardroom" && dir==="D" && state.hatchOpen) dest="belowroom";
  if(!dest){
    message(["YOU CAN'T GO THAT WAY."]);
    return;
  }

  const leaving=state.room;

  if(leaving==="well" && state.wellBellLowered){
    state.wellBellLowered=false;
  }

  state.room=dest;
  if(dest==="belowroom" && state.boardMarble){
    if(!state.dropped.belowroom) state.dropped.belowroom=[];
    if(!state.dropped.belowroom.includes("CLAY MARBLE") && !has("CLAY MARBLE")){
      state.dropped.belowroom.push("CLAY MARBLE");
    }
  }
  state.awaiting=null;

  if(dest==="creature" && state.creaturePhase==="initial"){
    state.creaturePhase="fledQuiet";
    if(!state.dropped.creature) state.dropped.creature=[];
    if(!state.dropped.creature.includes("CLAY MARBLE")){
      state.dropped.creature.push("CLAY MARBLE");
    }
    show([
      "SOMETHING SMALL AND FURRY LOOKS UP.",
      "",
      "THEN IT DARTS INTO THE DARK.",
      "",
      "A CLAY MARBLE IS LEFT BEHIND.",
      "IT ROLLS IN A SLOW CIRCLE.",
      "",
      "THE FLOOR IS LEVEL."
    ]);
    return;
  }

  show();
}

function norm(s){return s.trim().toUpperCase().replace(/\s+/g," ")}
function has(item){return state.inventory.includes(item)}

function droppedHere(){
  return state.dropped[state.room] || [];
}

function addDropped(item){
  if(!state.dropped[state.room]) state.dropped[state.room]=[];
  state.dropped[state.room].push(item);
}

function takeDropped(item){
  const here=droppedHere();
  const idx=here.indexOf(item);
  if(idx===-1) return false;
  here.splice(idx,1);
  state.inventory.push(item);
  return true;
}

function roomLook(id){
  const base = {
    start:["YOU LOOK AROUND.","","ROUGH STONE. NO WINDOWS.","","THE ONLY PASSAGE LEADS SOUTH."],
    corridor:["YOU LOOK AROUND.","","THE PASSAGE RUNS NORTH, EAST AND WEST.","","THE THREE SCRATCHES ARE ON THE NORTH WALL."],
    well:["YOU LOOK AROUND.","","STONE WALLS. A WELL.","","SOMETHING GLITTERS FAR BELOW."],
    stairs:["YOU LOOK AHEAD.","","THE PASSAGE CONTINUES EAST.","","YOU HEARD SOMETHING MOVE AHEAD."],
    creature:["YOU LOOK AROUND.","",state.creaturePhase==="initial" ? "THE SMALL FURRY THING IS STILL HERE." : "THE PASSAGE CONTINUES EAST AND WEST."],
    hookroom: state.secretOpen
      ? ["YOU LOOK AROUND.","","WHITE TILES. AN IRON HOOK. A SMALL METAL LABEL.","","A PASSAGE IS OPEN TO THE EAST."]
      : ["YOU LOOK AROUND.","","WHITE TILES. AN IRON HOOK. A SMALL METAL LABEL.","","THERE IS NO OBVIOUS WAY FORWARD."],
    beyond:["YOU LOOK AROUND.","","A REAL TREE GROWS HERE BENEATH NO VISIBLE CEILING.","","ONE ROOT DISAPPEARS INTO A CRACK IN THE FLOOR.","","THE PASSAGE CONTINUES NORTH."],
    rainroom:["YOU LOOK AROUND.","","RAIN FALLS THROUGH THE DRY STONE FLOOR.","","PASSAGES LEAD NORTH, EAST AND SOUTH."],
    mirrorroom:["YOU LOOK AROUND.","","A TALL MIRROR STANDS AGAINST THE FAR WALL.","","YOUR REFLECTION IS NOT THERE.","","THE WAY BACK IS WEST."],
    chairroom:["YOU LOOK AROUND.","","A WOODEN CHAIR FACES THE BLANK SOUTH WALL.","","PASSAGES LEAD SOUTH AND EAST."],
    boardroom:["YOU LOOK AROUND.","","A LOW STONE TABLE HOLDS A LONG BOARD OF SHALLOW CUPS.","",state.hatchOpen ? "THE TABLE HAS MOVED. THERE IS A WAY DOWN." : "THE WAY BACK IS WEST."],
    belowroom:["YOU LOOK AROUND.","","A THIN ROOT EMERGES FROM THE CEILING.","","A SMALL CLOTH BAG IS TIED TO IT.","","THE WAY BACK IS UP."]
  };

  if(id==="box"){
    const lines=["YOU LOOK AROUND.","","THE ROOM HAS PASSAGES EAST AND SOUTH.","",state.boxOpened ? "THE WOODEN BOX IS OPEN." : "THE WOODEN BOX IS CLOSED."];
    if(state.boxOpened && state.boxContents.length) lines.push("", "IT STILL CONTAINS:", "", ...state.boxContents.map(x=>"        "+x));
    const dropped=droppedHere();
    if(dropped.length) lines.push("", "ON THE FLOOR:  " + dropped.join(" · "));
    return lines;
  }

  const lines=[...(base[id] || roomText(id))];
  const dropped=droppedHere();
  if(dropped.length) lines.push("", "ON THE FLOOR:  " + dropped.join(" · "));
  return lines;
}

function die(reason){
  const body=reason||`YOU JUMP INTO THE WELL.

YOU HAVE QUITE A LONG TIME
TO REGRET THIS DECISION.`;
  state.dead=true;
  state.awaiting="again";
  mapEl.textContent="";
  roomdescEl.textContent="";
  exitLineEl.textContent="";
  contextEl.textContent="";
  if(finishedBarEl) finishedBarEl.classList.add("hidden");
  responseEl.textContent=`${body}

                *

             YOU DIED.

          PLAY AGAIN? Y/N`;
  cmd.focus();
}

function takeItem(name){
  if(state.inventory.length>=3) return "YOUR HANDS ARE FULL.";

  if(droppedHere().includes(name)){
    takeDropped(name);
    return "YOU TAKE THE "+name+".";
  }

  if(name==="CLAY MARBLE"){
    if(state.room!=="creature"){
      return has(name) ? "YOU ALREADY HAVE THAT." : "THERE IS NOTHING LIKE THAT HERE.";
    }
    if(state.creaturePhase==="initial"){
      return "THE FURRY THING PUTS ONE PAW ON THE MARBLE.";
    }
    if(state.creaturePhase==="fledShout"){
      state.creaturePhase="marbleTaken";
      state.inventory.push(name);
      return "YOU TAKE THE CLAY MARBLE.";
    }
    if(droppedHere().includes("CLAY MARBLE")){
      takeDropped("CLAY MARBLE");
      state.creaturePhase="marbleTaken";
      return "YOU TAKE THE CLAY MARBLE.";
    }
    return has(name) ? "YOU ALREADY HAVE THAT." : "THERE IS NOTHING LIKE THAT HERE.";
  }

  if(state.room!=="box" || !state.boxOpened || !state.boxContents.includes(name)){
    return has(name) ? "YOU ALREADY HAVE THAT." : "THERE IS NOTHING LIKE THAT HERE.";
  }

  state.boxContents=state.boxContents.filter(x=>x!==name);
  state.inventory.push(name);
  if(state.boxContents.length) return "YOU TAKE THE "+name+".\n\nTHE BOX STILL CONTAINS:\n\n"+state.boxContents.map(x=>"        "+x).join("\n");
  return "YOU TAKE THE "+name+".\n\nTHE BOX IS EMPTY.";
}

cmd.addEventListener("keydown",e=>{
  if(e.key==="Enter"){
    e.preventDefault();
    const value=cmd.value;
    cmd.value="";
    handle(value);
  }
});

document.addEventListener("keydown",e=>{
  if(game.classList.contains("hidden")){
    if(e.key==="Enter") startGame();
    return;
  }

  if(state.dead || state.awaiting==="again" || state.awaiting==="complete") return;

  const arrowKeys=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"];
  if(arrowKeys.includes(e.key)){
    const dir=resolveArrowMove(e.key);
    e.preventDefault();
    cmd.value="";
    if(dir) move(dir);
    else message(["YOU CAN'T GO THAT WAY."]);
  }
});

game.addEventListener("click",()=>cmd.focus());
helpBtn.addEventListener("click",(e)=>{
  e.stopPropagation();
  handle("HELP");
});
if(playAgainBtn){
  playAgainBtn.addEventListener("click",e=>{
    e.stopPropagation();
    restartGame();
  });
}
