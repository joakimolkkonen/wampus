function handle(raw){
  let input=norm(raw);
  if(!input) return;

  // Old-adventure convenience.
  input=input
    .replace(/^EXAMINE\b/,"LOOK")
    .replace(/^INSPECT\b/,"LOOK")
    .replace(/^LOOK AT\b/,"LOOK");

  // Forgive a few very common one-keystroke mistakes.
  const typoVerbs={
    "LOK":"LOOK","LKO":"LOOK",
    "TAEK":"TAKE","TKE":"TAKE",
    "OPNE":"OPEN","OEPEN":"OPEN",
    "PUL":"PULL","PSUH":"PUSH",
    "THRO":"THROW","RIGN":"RING"
  };
  const first=input.split(" ")[0];
  if(typoVerbs[first]){
    input=typoVerbs[first] + input.slice(first.length);
  }
  if(state.room!=="start" && input!=="HELP") onboardingEl.style.display="none";

  if(state.awaiting==="jump"){
    if(["Y","YES"].includes(input)){state.awaiting=null;die();return}
    if(["N","NO"].includes(input)){state.awaiting=null;message(["A RARE MOMENT OF GOOD JUDGEMENT."]);return}
    message(["YES OR NO WILL DO."]);
    state.awaiting="jump";
    return;
  }

  if(state.awaiting==="again"){
    if(["Y","YES","AGAIN"].includes(input)){
      state=freshState();
      show();
      return;
    }
    if(["N","NO"].includes(input)){
      state.awaiting=null;
      state.dead=true;
      mapEl.textContent="";
      logEl.textContent="THE SCREEN STAYS DARK.";
      cmd.focus();
      return;
    }
    logEl.textContent="YOU ARE DEAD.\n\nPLAY AGAIN? Y/N";
    cmd.focus();
    return;
  }

  const dirs={
    "N":"N","NORTH":"N","GO NORTH":"N",
    "S":"S","SOUTH":"S","GO SOUTH":"S",
    "E":"E","EAST":"E","GO EAST":"E",
    "W":"W","WEST":"W","GO WEST":"W",
    "U":"U","UP":"U","GO UP":"U",
    "D":"D","DOWN":"D","GO DOWN":"D"
  };
  if(dirs[input]){move(dirs[input]);return}

  if(state.room==="stairs" && ["LOOK AHEAD","LOOK PASSAGE"].includes(input)){
    message(roomLook("stairs"));
    return;
  }

  if(state.room==="beyond" && input==="LOOK TREE"){
    message([
      "THE BARK IS PALE AND SMOOTH.",
      "",
      "THE TRUNK CONTINUES UPWARD",
      "BEYOND YOUR LIGHT.",
      "",
      "YOU CANNOT TELL",
      "WHAT KIND OF TREE IT IS."
    ]);
    return;
  }

  if(state.room==="beyond" && ["LOOK ROOT","LOOK ROOTS"].includes(input)){
    message([
      "MOST OF THE ROOTS DISAPPEAR",
      "INTO DRY SOIL.",
      "",
      "ONE PASSES THROUGH",
      "A CRACK IN THE STONE FLOOR.",
      "",
      "IT IS SLIGHTLY WET."
    ]);
    return;
  }

  // --- RAIN ROOM --------------------------------------------------------
  if(state.room==="rainroom" && ["LOOK RAIN","TOUCH RAIN","CATCH RAIN"].includes(input)){
    message([
      "THE RAIN IS COLD.",
      "",
      "IT PASSES THROUGH YOUR HAND",
      "AND CONTINUES DOWNWARD.",
      "",
      "YOUR HAND REMAINS DRY."
    ]);
    return;
  }

  if(state.room==="rainroom" && ["DRINK RAIN","TASTE RAIN"].includes(input)){
    state.rainDrank=true;
    message([
      "YOU OPEN YOUR MOUTH.",
      "",
      "ONE DROP LANDS ON YOUR TONGUE.",
      "",
      "IT TASTES LIKE AN APPLE.",
      "",
      "NOT THIS APPLE.",
      "",
      "AN APPLE YOU HAVE NOT EATEN YET."
    ]);
    return;
  }

  if(state.room==="rainroom" && ["SHOUT","YELL"].includes(input)){
    message([
      "YOU SHOUT.",
      "",
      "THE RAIN STOPS.",
      "",
      "        ...",
      "",
      "YOU SHOUT AGAIN.",
      "",
      "THE RAIN RESUMES.",
      "",
      "YOU DID NOT SHOUT AGAIN."
    ]);
    return;
  }

  // --- MIRROR ROOM ------------------------------------------------------
  if(state.room==="mirrorroom" && ["LOOK MIRROR","LOOK REFLECTION"].includes(input)){
    message([
      "THE MIRROR SHOWS THE ROOM.",
      "",
      "IT SHOWS THE DOOR.",
      "IT SHOWS THE FLOOR.",
      "",
      "IT DOES NOT SHOW YOU.",
      "",
      "IN YOUR PLACE STANDS",
      "A SMALL DARK SHAPE.",
      "",
      "YOU CANNOT SEE ITS FACE."
    ]);
    return;
  }

  if(state.room==="mirrorroom" && ["TOUCH MIRROR","PUSH MIRROR","LICK MIRROR"].includes(input)){
    if(!state.mirrorTouched){
      state.mirrorTouched=true;
      message([
        "YOUR FINGERS TOUCH COLD GLASS.",
        "",
        "THE SMALL SHAPE",
        "TOUCHES THE GLASS TOO.",
        "",
        "WITH THE WRONG HAND."
      ]);
    } else {
      message([
        "THE GLASS IS COLD.",
        "",
        "THE OTHER HAND",
        "IS ALREADY WAITING."
      ]);
    }
    return;
  }

  if(state.room==="mirrorroom" && ["SHOUT","YELL","SHOUT AT MIRROR"].includes(input)){
    message([
      "YOU SHOUT AT THE MIRROR.",
      "",
      "THE SMALL SHAPE",
      "DOES NOT OPEN ITS MOUTH.",
      "",
      "SOMEWHERE BEHIND YOU:",
      "",
      "        ding"
    ]);
    return;
  }

  if(state.room==="mirrorroom" && ["BREAK MIRROR","HIT MIRROR","KICK MIRROR"].includes(input)){
    message([
      "YOU CONSIDER IT.",
      "",
      "THE THING IN THE MIRROR",
      "SHAKES ITS HEAD.",
      "",
      "YOU DECIDE TO POSTPONE",
      "THIS PARTICULAR EXPERIMENT."
    ]);
    return;
  }

  // --- CHAIR ROOM -------------------------------------------------------
  if(state.room==="chairroom" && ["LOOK CHAIR","EXAMINE CHAIR"].includes(input)){
    message([
      "AN ORDINARY WOODEN CHAIR.",
      "",
      "FOUR LEGS.",
      "ONE SEAT.",
      "ONE BACK.",
      "",
      "AFTER THE LAST FEW ROOMS,",
      "THIS IS SUSPICIOUS."
    ]);
    return;
  }

  if(state.room==="chairroom" && ["LOOK WALL","LOOK SOUTH WALL"].includes(input)){
    if(!state.chairSat){
      message([
        "A BLANK STONE WALL.",
        "",
        "THERE IS NOTHING ON IT."
      ]);
    } else {
      message([
        "A BLANK STONE WALL.",
        "",
        "THERE IS STILL NOTHING ON IT.",
        "",
        "YOU ARE LESS CERTAIN NOW."
      ]);
    }
    return;
  }

  if(state.room==="chairroom" && ["SIT","SIT CHAIR","SIT ON CHAIR"].includes(input)){
    state.chairSat=true;
    message([
      "YOU SIT.",
      "",
      "THE CHAIR IS COMFORTABLE.",
      "",
      "YOU FACE THE BLANK WALL.",
      "",
      "        ...",
      "",
      "AFTER A WHILE,",
      "THE WALL BLINKS.",
      "",
      "YOU STAND UP."
    ]);
    return;
  }

  if(state.room==="chairroom" && ["MOVE CHAIR","PUSH CHAIR","PULL CHAIR"].includes(input)){
    message([
      "YOU MOVE THE CHAIR.",
      "",
      "SCRATCHED INTO THE FLOOR",
      "BENEATH IT:",
      "",
      "        DO NOT SIT"
    ]);
    return;
  }

  // --- BOARD ROOM / FIRST REAL CROSS-ROOM PUZZLE -----------------------
  if(state.room==="boardroom" && ["LOOK BOARD","LOOK CUPS","LOOK TABLE"].includes(input)){
    message([
      "A LONG WOODEN BOARD.",
      "",
      "TWO ROWS OF SHALLOW CUPS.",
      "",
      "ELEVEN ARE EMPTY.",
      "",
      "THE TWELFTH CONTAINS",
      "A PERFECTLY ROUND HOLE."
    ]);
    return;
  }

  if(state.room==="boardroom" && isBoardMarbleCommand(input)){
    if(state.hatchOpen){
      message([
        "THE MARBLE HAS ALREADY FALLEN THROUGH.",
        "",
        "THERE IS A WAY DOWN."
      ]);
      return;
    }
    if(!has("CLAY MARBLE")){message(["YOU DON'T HAVE THE MARBLE."]);return}

    state.inventory=state.inventory.filter(x=>x!=="CLAY MARBLE");
    state.boardMarble=true;
    state.hatchOpen=true;

    message([
      "YOU PLACE THE MARBLE",
      "IN THE FIRST CUP.",
      "",
      "IT ROLLS INTO THE SECOND.",
      "",
      "THEN THE THIRD.",
      "",
      "THEN THE FOURTH.",
      "",
      "THERE IS NO CHANNEL",
      "BETWEEN THE CUPS.",
      "",
      "IT CONTINUES.",
      "",
      "ON THE TWELFTH CUP",
      "THE MARBLE DROPS",
      "THROUGH THE HOLE.",
      "",
      "        clack",
      "",
      "THE STONE TABLE",
      "SLIDES SIX INCHES ASIDE.",
      "",
      "THERE IS A WAY DOWN."
    ]);
    return;
  }

  if(state.room==="boardroom" && state.boardMarble && ["TAKE MARBLE","GET MARBLE"].includes(input)){
    message([
      "THE MARBLE IS GONE.",
      "",
      "YOU HEARD IT LAND",
      "SOMEWHERE BELOW."
    ]);
    return;
  }

  // --- BELOW ------------------------------------------------------------
  if(state.room==="belowroom" && ["LOOK BAG","TAKE BAG","GET BAG"].includes(input)){
    if(input.startsWith("TAKE") || input.startsWith("GET")){
      message([
        "THE BAG IS TIED",
        "TO THE ROOT.",
        "",
        "THE KNOT IS VERY SMALL.",
        "",
        "YOUR FINGERS ARE NOT."
      ]);
    } else {
      message([
        "A SMALL CLOTH BAG.",
        "",
        "IT IS TIED TO THE ROOT",
        "WITH A RIDICULOUSLY",
        "NEAT LITTLE KNOT.",
        "",
        "SOMETHING HARD IS INSIDE."
      ]);
    }
    return;
  }

  if(state.room==="belowroom" && ["OPEN BAG","UNTIE BAG","UNTIE KNOT","PULL BAG"].includes(input)){
    if(!state.dropped.belowroom) state.dropped.belowroom=[];
    if(!state.dropped.belowroom.includes("BLACK BUTTON") && !has("BLACK BUTTON")){
      state.dropped.belowroom.push("BLACK BUTTON");
    }
    message([
      "THE KNOT COMES UNDONE",
      "MUCH TOO EASILY.",
      "",
      "INSIDE THE BAG:",
      "",
      "A SINGLE BLACK BUTTON.",
      "",
      "NOT A BUTTON FROM CLOTHING.",
      "",
      "A BUTTON YOU PRESS."
    ]);
    return;
  }

  if(state.room==="belowroom" && ["LOOK ROOT","PULL ROOT","TOUCH ROOT"].includes(input)){
    message([
      "THE ROOT IS THINNER HERE.",
      "",
      "IT DISAPPEARS INTO",
      "THE CEILING.",
      "",
      "SOMEWHERE ABOVE YOU,",
      "LEAVES RUSTLE."
    ]);
    return;
  }

  if(["PRESS BUTTON","PUSH BUTTON","USE BUTTON"].includes(input)){
    if(!has("BLACK BUTTON")){message(["YOU DON'T HAVE A BUTTON."]);return}
    if(state.atPrototypeEnd){
      message(prototypeEndingLines());
      return;
    }
    state.atPrototypeEnd=true;
    message([
      "YOU PRESS THE BUTTON.",
      "",
      "        click",
      "",
      "NOTHING HAPPENS HERE.",
      "",
      "SOMEWHERE VERY FAR AWAY,",
      "SOMETHING LARGE OPENS.",
      ...prototypeEndingLines()
    ]);
    return;
  }



  if(input==="LOOK"){message(roomLook(state.room));return}

  const bareLooks={
    "BOX":"LOOK BOX",
    "BELL":"LOOK BELL",
    "STRING":"LOOK STRING",
    "APPLE":"LOOK APPLE",
    "MARBLE":"LOOK MARBLE",
    "HOOK":"LOOK HOOK",
    "LABEL":"LOOK LABEL",
    "TREE":"LOOK TREE",
    "ROOT":"LOOK ROOT",
    "WELL":"LOOK WELL",
    "SCRATCHES":"LOOK SCRATCHES",
    "TAG":"LOOK TAG",
    "TREE":"LOOK TREE",
    "RAIN":"LOOK RAIN",
    "MIRROR":"LOOK MIRROR",
    "REFLECTION":"LOOK MIRROR",
    "CHAIR":"LOOK CHAIR",
    "WALL":"LOOK WALL",
    "BOARD":"LOOK BOARD",
    "CUPS":"LOOK BOARD",
    "BAG":"LOOK BAG",
    "BUTTON":"LOOK BUTTON"
  };
  if(bareLooks[input]){
    handle(bareLooks[input]);
    return;
  }

  if(["INVENTORY","I","CHECK INVENTORY"].includes(input)){
    message(state.inventory.length
      ? ["YOU ARE CARRYING:","",...state.inventory.map(x=>"        "+x)]
      : ["YOU ARE CARRYING NOTHING."]);
    return;
  }

  if(input==="HELP"){
    message([
      "ARROW KEYS MOVE.",
      "TYPE SIMPLE COMMANDS.",
      "",
      "LOOK · TAKE · DROP · USE",
      "OPEN · PULL · PUSH · SHOUT",
      "",
      "TRY THINGS."
    ]);
    return;
  }

  if(input==="WAMPUS"){message(["THAT IS NOT A QUESTION."]);return}
  if(input==="WHO AM I" || input==="WHO AM I?"){message(["YOU ARE @."]);return}

  if(["LOOK SCRATCHES","EXAMINE SCRATCHES","LOOK LINES","EXAMINE LINES"].includes(input)){
    if(state.room!=="corridor"){message(["THERE ARE NO SCRATCHES HERE."]);return}
    if(has("BRASS TAG")){
      message([
        "THREE STRAIGHT LINES.",
        "",
        "THEY WERE CUT FROM BOTTOM TO TOP.",
        "",
        "YOU HOLD UP THE BRASS TAG.",
        "",
        "THE SPACING IS EXACT.",
        "",
        "THAT SEEMS UNLIKELY."
      ]);
    } else {
      message([
        "THREE STRAIGHT LINES.",
        "",
        "THEY WERE CUT FROM BOTTOM TO TOP.",
        "",
        "YOU ARE NOT SURE WHY THAT BOTHERS YOU."
      ]);
    }
    return;
  }

  if(["LOOK GLIMMER","LOOK GLITTER","LOOK GLITTERING THING","LOOK BOTTOM"].includes(input)){
    if(state.room!=="well"){message(["YOU CANNOT SEE IT FROM HERE."]);return}
    if(state.wellSolved){
      message(["THE GLIMMER IS GONE."]);
    } else {
      message([
        "SOMETHING METALLIC CATCHES THE LIGHT",
        "FAR BELOW.",
        "",
        "TOO FAR TO REACH.",
        "",
        "THE LIGHT MOVES WHEN YOU DO."
      ]);
    }
    return;
  }

  if(state.room==="well"){
    if(["LOOK WELL"].includes(input)){
      if(state.wellBellLowered){
        message([
          "THE STRING DISAPPEARS INTO THE DARKNESS.",
          "",
          "IT IS PULLED SLIGHTLY TO ONE SIDE."
        ]);
      } else {
        message([
          "IT IS STILL VERY DEEP.",
          "",
          state.wellSolved ? "THE GLIMMER IS GONE." : "SOMETHING STILL GLITTERS AT THE BOTTOM."
        ]);
      }
      return;
    }
    if(["CLIMB WELL","CLIMB INTO WELL"].includes(input)){message(["THERE IS NOTHING TO CLIMB."]);return}
    if(["JUMP","JUMP IN WELL","JUMP INTO WELL"].includes(input)){
      state.awaiting="jump";
      message(["ARE YOU SURE? Y/N"]);
      return;
    }
  }

  if(state.room==="hookroom" && ["TOUCH HOOK","WIGGLE HOOK"].includes(input)){
    if(state.secretOpen){
      message([
        "THE HOOK IS ALREADY",
        "SITTING AT AN ODD ANGLE.",
        "",
        "THE PASSAGE EAST IS OPEN."
      ]);
    } else {
      message([
        "THE HOOK WIGGLES.",
        "",
        "NOT MUCH.",
        "",
        "MORE THAN A HOOK SHOULD."
      ]);
    }
    return;
  }

  if(state.room==="hookroom" && ["PULL HOOK","PUSH HOOK","TURN HOOK","MOVE HOOK","USE HOOK"].includes(input)){
    if(state.secretOpen){
      message(["THE HOOK MOVES.","","THE PASSAGE IS ALREADY OPEN."]);
      return;
    }
    state.secretOpen=true;
    message([
      "THE HOOK MOVES.",
      "",
      "        clunk",
      "",
      "SOMETHING HEAVY SHIFTS",
      "INSIDE THE EAST WALL.",
      "",
      "A SECTION OF STONE",
      "SLIDES QUIETLY ASIDE.",
      "",
      "A PASSAGE IS NOW OPEN TO THE EAST."
    ]);
    return;
  }

  if(state.room==="hookroom" && ["HIT HOOK","KICK HOOK"].includes(input)){
    message(["        clang","","SOMETHING CLANGS BACK","FROM INSIDE THE WALL."]);
    return;
  }

  if(state.room==="hookroom" && ["SHOUT AT HOOK","YELL AT HOOK"].includes(input)){
    message(["THE HOOK REMAINS A HOOK.","","YOU FEEL SLIGHTLY FOOLISH."]);
    return;
  }

  if(state.room==="hookroom" && ["LICK HOOK","TASTE HOOK"].includes(input)){
    message(["YOU LICK THE HOOK.","","IT TASTES LIKE IRON.","","THIS HAS NOT HELPED."]);
    return;
  }

  if(state.room==="box"){
    if(input==="OPEN" || input==="OPEN LID"){
      input="OPEN BOX";
    }
    if(input==="CLOSE"){
      input="CLOSE BOX";
    }
    if(input==="CLOSE BOX"){
      if(!state.boxOpened){message(["IT IS ALREADY CLOSED."]);return}
      state.boxOpened=false;
      message(["YOU CLOSE THE BOX.", "", 'THE WORDS "FOR WAMPUS" FACE UPWARD.']);
      return;
    }
    if(input==="OPEN BOX"){
      if(state.boxOpened){show(boxContentsText());return}
      state.boxOpened=true;
      show([
        "THE BOX CONTAINS:",
        "",
        "        A BRASS BELL",
        "        A PIECE OF STRING",
        "        HALF AN APPLE"
      ]);
      return;
    }

    if(["LOOK BOX","EXAMINE BOX"].includes(input)){
      if(state.boxOpened){show(boxContentsText());return}
      message([
        "A SMALL WOODEN BOX.",
        "",
        "IT IS CLOSED.",
        "",
        'THE WORDS "FOR WAMPUS" ARE WRITTEN ON THE LID.'
      ]);
      return;
    }

    if(input==="READ BOX"){
      message(["FOR WAMPUS.","","THE HANDWRITING IS VERY NEAT."]);
      return;
    }
  }

  const aliases={
    "BELL":"BRASS BELL",
    "BRASS BELL":"BRASS BELL",
    "STRING":"PIECE OF STRING",
    "PIECE OF STRING":"PIECE OF STRING",
    "APPLE":"HALF AN APPLE",
    "HALF AN APPLE":"HALF AN APPLE",
    "MARBLE":"CLAY MARBLE",
    "CLAY MARBLE":"CLAY MARBLE",
    "BELL ON STRING":"BELL ON STRING",
    "KEY":"BRASS KEY",
    "BRASS KEY":"BRASS KEY",
    "TAG":"BRASS TAG",
    "BRASS TAG":"BRASS TAG",
    "BAG":"CLOTH BAG",
    "CLOTH BAG":"CLOTH BAG",
    "BUTTON":"BLACK BUTTON",
    "BLACK BUTTON":"BLACK BUTTON"
  };

  if(input==="TAKE ALL"){
    let available=[];

    if(state.room==="box" && state.boxOpened){
      available=[...state.boxContents];
    }

    for(const item of droppedHere()){
      if(!available.includes(item)) available.push(item);
    }

    if(state.room==="creature" && state.creaturePhase==="fledShout" && !available.includes("CLAY MARBLE")){
      available.push("CLAY MARBLE");
    }

    if(!available.length){
      message(["THERE IS NOTHING HERE TO TAKE."]);
      return;
    }

    let took=[];
    for(const item of [...available]){
      if(state.inventory.length>=3) break;
      const before=[...state.inventory];
      takeItem(item);
      if(state.inventory.length>before.length) took.push(item);
    }

    const lines=took.length
      ? ["YOU TAKE:","",...took.map(x=>"        "+x)]
      : ["YOUR HANDS ARE FULL."];

    if(state.inventory.length>=3 && available.length>took.length){
      lines.push("","SOMETHING REMAINS.");
    }

    message(lines);
    return;
  }

  if(input.startsWith("TAKE ")){
    const key=aliases[input.slice(5)];
    message([key ? takeItem(key) : "THERE IS NOTHING LIKE THAT HERE."]);
    return;
  }

  if(["LOOK BELL"].includes(input)){
    if(!has("BRASS BELL") && !has("BELL ON STRING") && !droppedHere().includes("BRASS BELL") && !droppedHere().includes("BELL ON STRING")){
      message(["YOU CANNOT SEE A BELL HERE."]); return;
    }
    message(["A SMALL BRASS BELL.","","THE METAL IS SLIGHTLY WARM."]); return;
  }

  if(["LOOK STRING"].includes(input)){
    if(!has("PIECE OF STRING") && !has("BELL ON STRING") && !droppedHere().includes("PIECE OF STRING")){
      message(["YOU CANNOT SEE ANY STRING HERE."]); return;
    }
    message(["A PIECE OF ORDINARY STRING.","","LONG ENOUGH FOR SOMETHING."]); return;
  }

  if(["LOOK APPLE","LOOK HALF AN APPLE"].includes(input)){
    if(!has("HALF AN APPLE") && !droppedHere().includes("HALF AN APPLE")){
      message(["YOU CANNOT SEE AN APPLE HERE."]); return;
    }
    message([
      "HALF AN APPLE.",
      "",
      "THE OTHER HALF IS MISSING.",
      "",
      "NOT EATEN.",
      "MISSING."
    ]); return;
  }

  if(["LOOK MARBLE","LOOK CLAY MARBLE"].includes(input)){
    if(!has("CLAY MARBLE") && !droppedHere().includes("CLAY MARBLE")){
      message(["YOU CANNOT SEE A MARBLE HERE."]); return;
    }
    message([
      "A SMALL CLAY MARBLE.",
      "",
      "IT DOES NOT SEEM ESPECIALLY ROUND.",
      "",
      "THIS DOES NOT EXPLAIN",
      "HOW IT MOVES."
    ]); return;
  }

  if(["LOOK TAG","LOOK BRASS TAG","READ TAG"].includes(input)){
    if(!has("BRASS TAG") && !droppedHere().includes("BRASS TAG")){message(["YOU CANNOT SEE A TAG HERE."]);return}
    message(["A SMALL BRASS TAG.","","THREE MARKS ARE CUT INTO IT:","","        ///","","THE SPACING IS VERY PRECISE."]);
    return;
  }

  if(input==="LOOK HOOK"){
    if(state.room!=="hookroom"){message(["THERE IS NO HOOK HERE."]);return}
    message([
      "A THICK IRON HOOK.",
      "",
      "IT IS NOT HOLDING ANYTHING.",
      "",
      "IT WIGGLES SLIGHTLY",
      "WHEN YOU TOUCH IT."
    ]);
    return;
  }

  if(["LOOK LABEL","READ LABEL"].includes(input)){
    if(state.room!=="hookroom"){message(["THERE IS NO LABEL HERE."]);return}
    message([
      "A SMALL METAL LABEL.",
      "",
      "IT READS:",
      "",
      "        @"
    ]);
    return;
  }

  if(["LOOK SEAM","LOOK TILES","EXAMINE SEAM","EXAMINE TILES"].includes(input)){
    if(state.room!=="hookroom"){message(["NOTHING HERE MATCHES THAT DESCRIPTION."]);return}
    if(!state.hookWeighted) message([
      "WHITE FLOOR TILES.",
      "",
      "ONE TILE NEAR THE EAST WALL",
      "SITS SLIGHTLY LOWER THAN THE OTHERS."
    ]);
    else if(!state.secretOpen) message(["A HAIRLINE SEAM RUNS","TOWARD THE EAST WALL.","","IT WAS NOT VISIBLE BEFORE."]);
    else message(["THE SEAM ENDS AT THE OPEN PASSAGE."]);
    return;
  }

  if((input==="RING BELL" || input==="SHAKE BELL") && state.room==="beyond"){
    if(!has("BRASS BELL") && !has("BELL ON STRING")){message(["YOU DON'T HAVE A BELL."]);return}

    if(!state.treeBellEvent){
      state.treeBellEvent=true;
      if(!state.dropped.beyond) state.dropped.beyond=[];
      if(!state.dropped.beyond.includes("BRASS TAG")) state.dropped.beyond.push("BRASS TAG");
      message([
        "THE BELL MAKES NO SOUND.",
        "",
        "HIGH ABOVE YOU,",
        "LEAVES RUSTLE.",
        "",
        "SOMETHING FALLS.",
        "",
        "        tik",
        "",
        "A SMALL BRASS TAG",
        "LANDS BESIDE THE ROOT.",
        "",
        "THREE MARKS ARE CUT INTO IT:",
        "",
        "        ///"
      ]);
    } else {
      message([
        "THE BELL MAKES NO SOUND.",
        "",
        "HIGH ABOVE YOU,",
        "THE LEAVES RUSTLE AGAIN.",
        "",
        "NOTHING ELSE FALLS."
      ]);
    }
    return;
  }

  if(input==="RING BELL" || input==="SHAKE BELL"){
    if(has("BELL ON STRING")){
      handle("RING BELL ON STRING");
      return;
    }
    if(!has("BRASS BELL")){message(["YOU DON'T HAVE THAT."]);return}

    if(state.room==="hookroom"){
      message([
        "THE BELL MAKES NO SOUND.",
        "",
        "THE COAT HOOK TREMBLES ANYWAY."
      ]);
      return;
    }

    if(state.room==="creature" && state.creaturePhase==="initial"){
      message([
        "THE BELL MAKES NO SOUND.",
        "",
        "THE FURRY THING LOOKS UP ANYWAY."
      ]);
      return;
    }

    message([
      "THE BELL MAKES NO SOUND.",
      "",
      "THIS SEEMS WRONG."
    ]);
    return;
  }

  if(input.startsWith("DROP ")){
    const key=aliases[input.slice(5)];
    if(!key || !has(key)){message(["YOU ARE NOT CARRYING THAT."]);return}
    state.inventory=state.inventory.filter(x=>x!==key);
    addDropped(key);
    message(["YOU DROP THE "+key+"."]);
    return;
  }

  if(input==="USE BELL"){ handle("RING BELL"); return; }
  if(input==="USE STRING"){
    if(!has("PIECE OF STRING")){message(["YOU DON'T HAVE THE STRING."]);return}
    message(["USE IT WITH WHAT?"]); return;
  }
  if(input==="USE APPLE"){
    if(!has("HALF AN APPLE")){message(["YOU DON'T HAVE THE APPLE."]);return}
    message(["YOU TURN THE APPLE IN YOUR HAND.","","IT CONTINUES TO BE HALF AN APPLE."]); return;
  }
  if(input==="USE MARBLE"){
    if(!has("CLAY MARBLE")){message(["YOU DON'T HAVE THE MARBLE."]);return}
    handle("ROLL MARBLE"); return;
  }

  if(["USE STRING WITH BELL","USE BELL WITH STRING","TIE STRING TO BELL","TIE STRING ON BELL","ATTACH STRING TO BELL","COMBINE STRING BELL","COMBINE BELL STRING"].includes(input)){
    if(!has("PIECE OF STRING")){message(["YOU DON'T HAVE THE STRING."]);return}
    if(!has("BRASS BELL")){message(["YOU DON'T HAVE THE BELL."]);return}

    state.inventory=state.inventory.filter(x=>x!=="PIECE OF STRING" && x!=="BRASS BELL");
    state.inventory.push("BELL ON STRING");

    message([
      "YOU TIE THE STRING TO THE BELL.",
      "",
      "IT NOW HAS A HANDLE.",
      "",
      "THIS FEELS LIKE PROGRESS.",
      "",
      "YOU ARE NOT SURE TOWARD WHAT."
    ]);
    return;
  }

  if([
    "USE STRING ON WELL","USE STRING WITH WELL","USE BELL ON WELL","USE BELL WITH WELL",
    "LOWER BELL","LOWER BELL INTO WELL","LOWER STRING","LOWER STRING INTO WELL",
    "LOWER BELL ON STRING","LOWER BELL ON STRING INTO WELL"
  ].includes(input)){
    if(state.room!=="well"){message(["THERE IS NO WELL HERE."]);return}
    if(!has("BELL ON STRING")){
      if(has("PIECE OF STRING") && has("BRASS BELL")) message(["THE STRING MIGHT REACH.","","THE BELL WOULD GIVE IT SOME WEIGHT."]);
      else if(has("PIECE OF STRING")) message(["YOU LOWER THE STRING.","","IT HANGS AGAINST THE WALL.","","IT NEEDS SOME WEIGHT."]);
      else message(["YOU DON'T HAVE ANYTHING SUITABLE."]);
      return;
    }
    if(state.wellBellLowered){message(["THE BELL IS ALREADY DOWN THERE."]);return}
    state.wellBellLowered=true;
    message(["YOU LOWER THE BELL INTO THE WELL.","","THE STRING UNWINDS.","","AND UNWINDS.","","LONGER THAN IT LOOKED.","","THEN THE BELL TOUCHES SOMETHING.","","        ding","","NOT YOUR BELL."]);
    return;
  }

  if(["PULL STRING","PULL BELL","RAISE BELL","RAISE STRING","PULL UP BELL","PULL UP STRING"].includes(input)){
    if(state.room!=="well"){message(["THERE IS NOTHING HERE TO PULL UP."]);return}
    if(!state.wellBellLowered){message(["NOTHING IS HANGING IN THE WELL."]);return}
    state.wellBellLowered=false;
    message(["YOU PULL THE BELL BACK UP.","","THE BELL IS COLD NOW."]);
    return;
  }

  if(["LOOK BELL ON STRING","EXAMINE BELL ON STRING"].includes(input)){
    if(!has("BELL ON STRING")){message(["YOU DON'T HAVE THAT."]);return}
    message([
      "A SMALL BRASS BELL",
      "TIED TO A PIECE OF STRING.",
      "",
      "THE KNOT LOOKS BETTER THAN EXPECTED."
    ]);
    return;
  }

  if(["RING BELL ON STRING","SHAKE BELL ON STRING"].includes(input)){
    if(!has("BELL ON STRING")){message(["YOU DON'T HAVE THAT."]);return}
    if(state.room==="hookroom"){
      message([
        "THE BELL MAKES NO SOUND.",
        "",
        "THE COAT HOOK TREMBLES.",
        "",
        "THIS TIME, SO DOES THE LABEL."
      ]);
    } else {
      message([
        "THE BELL MAKES NO SOUND.",
        "",
        "THE STRING TWITCHES IN YOUR HAND."
      ]);
    }
    return;
  }

  if(["ROLL MARBLE","ROLL CLAY MARBLE"].includes(input)){
    if(!has("CLAY MARBLE")){message(["YOU DON'T HAVE THAT."]);return}

    if(state.room==="__oldhook" && !state.hookWeighted){
      message([
        "YOU ROLL THE MARBLE.",
        "",
        "IT CURVES TOWARD",
        "THE EAST WALL.",
        "",
        "THEN STOPS BESIDE",
        "THE SLIGHTLY LOWER TILE."
      ]);
      return;
    }

    if(state.room==="__oldhook" && state.hookWeighted && !state.secretOpen){
      state.inventory=state.inventory.filter(x=>x!=="CLAY MARBLE");
      state.secretOpen=true;
      message([
        "YOU ROLL THE MARBLE.",
        "",
        "IT CURVES TOWARD",
        "THE LOWER TILE.",
        "",
        "THE MARBLE DROPS",
        "INTO A NARROW GAP.",
        "",
        "        click",
        "",
        "A SECTION OF THE EAST WALL",
        "SLIDES QUIETLY ASIDE."
      ]);
      return;
    }

    if(state.room==="beyond"){
      message([
        "YOU ROLL THE MARBLE.",
        "",
        "IT CIRCLES THE TREE.",
        "",
        "ON THE THIRD LAP",
        "IT STOPS AGAINST THE WET ROOT.",
        "",
        "FOR THE FIRST TIME,",
        "IT STAYS STILL.",
        "",
        "YOU PICK IT UP AGAIN."
      ]);
      return;
    }

    message([
      "YOU ROLL THE MARBLE.",
      "",
      "IT CURVES LEFT.",
      "",
      "THERE IS NO SLOPE.",
      "",
      "YOU PICK IT UP AGAIN."
    ]);
    return;
  }

  if(["THROW MARBLE","THROW CLAY MARBLE"].includes(input)){
    if(!has("CLAY MARBLE")){message(["YOU DON'T HAVE THAT."]);return}
    state.inventory=state.inventory.filter(x=>x!=="CLAY MARBLE");
    addDropped("CLAY MARBLE");
    message([
      "YOU THROW THE MARBLE.",
      "",
      "IT HITS THE WALL.",
      "",
      "A MOMENT LATER, SOMETHING",
      "TAPS BACK FROM THE OTHER SIDE.",
      "",
      "THE MARBLE ROLLS TO A STOP."
    ]);
    return;
  }

  if(["LOOK WALL","LOOK WALLS","LOOK OTHER SIDE"].includes(input)){
    if(state.room==="creature" || state.room==="hookroom"){
      message([
        "YOU STUDY THE WALL.",
        "",
        "STONE ON THIS SIDE.",
        "",
        "SOMETHING HOLLOW BEHIND IT."
      ]);
    } else {
      message(["THE WALL IS UNREMARKABLE."]);
    }
    return;
  }

  if(input==="JUMP"){
    message([
      "YOU JUMP.",
      "",
      "YOU COME BACK DOWN.",
      "",
      "VERY LITTLE HAS CHANGED."
    ]);
    return;
  }

  if(["THROW APPLE","THROW HALF AN APPLE"].includes(input)){
    if(!has("HALF AN APPLE")){message(["YOU DON'T HAVE THAT."]);return}
    state.inventory=state.inventory.filter(x=>x!=="HALF AN APPLE");
    addDropped("HALF AN APPLE");
    message([
      "YOU THROW THE APPLE.",
      "",
      "IT LANDS A SHORT DISTANCE AWAY.",
      "",
      "THE APPLE APPEARS",
      "TO HAVE EXPECTED MORE."
    ]);
    return;
  }

  if(["GIVE APPLE","GIVE APPLE TO CREATURE","OFFER APPLE"].includes(input)){
    if(!has("HALF AN APPLE")){message(["YOU DON'T HAVE THAT."]);return}
    if(state.room!=="creature"){
      message(["YOU HOLD OUT THE APPLE.","","NOTHING HERE ACCEPTS IT."]); return;
    }
    message([
      "YOU HOLD OUT THE APPLE.",
      "",
      "THE FURRY THING IS GONE.",
      "",
      "THIS MAKES THE GESTURE",
      "LESS EFFECTIVE."
    ]);
    return;
  }

  if(input==="EAT APPLE"){
    if(!has("HALF AN APPLE")){message(["YOU DON'T HAVE THAT."]);return}
    state.inventory=state.inventory.filter(x=>x!=="HALF AN APPLE");
    message([
      "YOU EAT THE APPLE.",
      "",
      "IT TASTES LIKE SOMETHING",
      "YOU HAVEN'T EATEN YET.",
      "",
      "YOU ARE NOT SURE WHAT THAT MEANS."
    ]);
    return;
  }

  if(input==="SHOUT"){
    if(state.room==="creature" && state.creaturePhase==="initial"){
      state.creaturePhase="fledShout";
      show();
      return;
    }

    const replies={
      start:["THE ROOM SWALLOWS THE SOUND."],
      corridor:["THE PASSAGE ECHOES.","","ECHOES.","","ECHOES."],
      well:["SOMETHING SHOUTS BACK.","","IT IS NOT YOU."],
      box:["THE BOX DOES NOT RESPOND."],
      stairs:[
        "YOUR VOICE RUNS DOWN THE PASSAGE.",
        "",
        "THE SCRAPING STOPS.",
        "",
        "SOMETHING SMALL MOVES AWAY."
      ],
      creature:["THE PASSAGE STAYS QUIET."],
      hookroom:["THE TILES GIVE YOUR VOICE BACK TO YOU.","","ONE WORD LATER."]
    };
    message(replies[state.room] || ["YOUR VOICE FADES INTO NOTHING."]);
    return;
  }

  if(input==="FUCK CREATURE" || input==="FUCK THE CREATURE"){
    message([
      "NO.",
      "",
      "ALSO, THE CREATURE IS NOT HERE."
    ]);
    return;
  }

  if(input==="KICK TREE"){
    if(state.room!=="beyond"){message(["THERE IS NO TREE HERE."]);return}
    message([
      "YOU KICK THE TREE.",
      "",
      "THE TREE DECLINES TO COMMENT."
    ]);
    return;
  }

  if(input==="TAP WALL"){
    message([
      "        tap",
      "",
      "THE WALL REMAINS COMMITTED",
      "TO BEING A WALL."
    ]);
    return;
  }

  if(input==="FUCK TREE"){
    if(state.room!=="beyond"){message(["THERE IS NO TREE HERE."]);return}
    message([
      "THE TREE IS FLATTERED.",
      "",
      "THE TREE IS ALSO A TREE."
    ]);
    return;
  }

  if(input==="FUCK MIRROR"){
    if(state.room!=="mirrorroom"){message(["THERE IS NO MIRROR HERE."]);return}
    message([
      "THE THING IN THE MIRROR",
      "TAKES ONE STEP BACK."
    ]);
    return;
  }

  if(input==="EAT MARBLE"){
    if(!has("CLAY MARBLE")){message(["YOU DON'T HAVE THE MARBLE."]);return}
    message([
      "YOU PUT THE MARBLE",
      "IN YOUR MOUTH.",
      "",
      "THIS IS HOW STORIES",
      "ABOUT EMERGENCY ROOMS BEGIN.",
      "",
      "YOU REMOVE IT."
    ]);
    return;
  }

  if(state.room==="rainroom" && ["RING BELL","SHAKE BELL"].includes(input)){
    if(!has("BRASS BELL") && !has("BELL ON STRING")){
      message(["YOU DON'T HAVE A BELL."]);
      return;
    }
    message([
      "THE BELL MAKES NO SOUND.",
      "",
      "EVERY RAINDROP STOPS",
      "IN MID-AIR.",
      "",
      "FOR ONE SECOND.",
      "",
      "THEN THEY ALL FALL AT ONCE."
    ]);
    return;
  }

  message(["THE COMPUTER DOES NOT UNDERSTAND."]);
}