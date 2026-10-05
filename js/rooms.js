const ROOMS = {
  start:{
    exits:{S:"corridor"},
    art:[
      "       ┌─────────┐",
      "       │         │",
      "       │    @    │",
      "       │         │",
      "       └────┬────┘",
      "            │",
      "            ?"
    ],
    text:[
      "YOU ARE IN A SMALL STONE ROOM.",
      "",
      "YOU DON'T REMEMBER COMING HERE.",
      "",
      "THERE IS A PASSAGE TO THE SOUTH."
    ]
  },

  corridor:{
    exits:{N:"start",E:"well",W:"box"},
    art:[
      "             ?",
      "             │",
      "      ┌──────┴──────┐",
      "  ? ──┤      @      ├── ?",
      "      └─────────────┘"
    ],
    text:[
      "THE PASSAGE WIDENS.",
      "",
      "SOMETHING HAS SCRATCHED THREE LINES",
      "INTO THE NORTH WALL.",
      "",
      "///",
      "",
      "YOU HEAR WATER TO THE EAST."
    ]
  },

  well:{
    exits:{W:"corridor"},
    art:[
      "      ┌─────────────┐",
      "──────┤      ○      │",
      "      │             │",
      "      │      @      │",
      "      └─────────────┘"
    ],
    text:[
      "THERE IS A WELL HERE.",
      "",
      "IT IS VERY DEEP.",
      "",
      "SOMETHING GLITTERS AT THE BOTTOM."
    ]
  },

  box:{
    exits:{E:"corridor",S:"stairs"},
    artClosed:[
      "      ┌──────────────┐",
      "      │   [ ]        │",
      "      │         @    ├──── ?",
      "      │              │",
      "      └──────┬───────┘",
      "             │",
      "             ?"
    ],
    artOpen:[
      "      ┌──────────────┐",
      "      │   [o]        │",
      "      │         @    ├──── ?",
      "      │              │",
      "      └──────┬───────┘",
      "             │",
      "             ?"
    ],
    text:[
      "A SMALL WOODEN BOX SITS AGAINST THE WALL.",
      "",
      "SOMEBODY HAS WRITTEN:",
      "",
      "        FOR WAMPUS",
      "",
      "ON THE LID."
    ]
  },

  stairs:{
    exits:{N:"box",E:"creature"},
    art:[
      "             ?",
      "             │",
      "      ┌──────┴──────┐",
      "      │             │",
      "      │      @      ├──── ?",
      "      │             │",
      "      └─────────────┘"
    ],
    text:[
      "THE PASSAGE NARROWS.",
      "",
      "        scrape",
      "",
      "SOMETHING IS MOVING AHEAD.",
      "",
      "WHEN YOU MOVE, IT STOPS."
    ]
  },

  creature:{
    exits:{W:"stairs",E:"hookroom"},
    artInitial:[
      "      ┌─────────────┐",
      "──────┤      @      ├──── ?",
      "      │       ?  o  │",
      "      └─────────────┘"
    ],
    artMarble:[
      "      ┌─────────────┐",
      "──────┤      @      ├──── ?",
      "      │          o  │",
      "      └─────────────┘"
    ],
    artEmpty:[
      "      ┌─────────────┐",
      "──────┤      @      ├──── ?",
      "      │             │",
      "      └─────────────┘"
    ]

  },

  hookroom:{
    exits:{W:"creature"},
    artClosed:[
      "      ┌─────────────┐",
      "──────┤      @      │",
      "      │             │",
      "      │        ┐    │",
      "      └─────────────┘"
    ],
    artOpen:[
      "      ┌─────────────┐",
      "──────┤      @      ├────",
      "      │             │",
      "      │        ┐    │",
      "      └─────────────┘"
    ],
    text:[
      "A SMALL TILED ROOM.",
      "",
      "AN IRON HOOK PROTRUDES",
      "FROM THE EAST WALL.",
      "",
      "A SMALL METAL LABEL",
      "IS FIXED BENEATH IT."
    ]
  },

  beyond:{
    exits:{W:"hookroom",N:"rainroom"},
    art:[
      "      │           │",
      "──────┤     @     │",
      "      │           │",
      "      │     ♣     │",
      "      │    /|\\    │",
      "      │   / | \\   │",
      "      │           │"
    ],
    text:[
      "THERE IS A TREE HERE.",
      "",
      "A REAL ONE, APPARENTLY.",
      "",
      "ITS TRUNK DISAPPEARS UPWARD",
      "INTO DARKNESS.",
      "",
      "YOU CANNOT SEE THE CEILING.",
      "",
      "ONE ROOT DISAPPEARS",
      "INTO A CRACK IN THE FLOOR.",
      "",
      "SOMEWHERE FAR AWAY:",
      "",
      "        ding",
      "",
      "THE PASSAGE CONTINUES NORTH."
    ]
  },

  rainroom:{
    exits:{S:"beyond",E:"mirrorroom",N:"chairroom"},
    art:[
      "       │     │",
      "   .   │  @  │   .",
      " .   . │     │ .",
      "───────┘     └───────",
      "    .     .     ."
    ],
    text:[
      "IT IS RAINING HERE.",
      "",
      "ONLY HERE.",
      "",
      "THE STONE FLOOR IS DRY.",
      "",
      "THE RAIN FALLS THROUGH IT",
      "WITHOUT SPLASHING."
    ]
  },

  mirrorroom:{
    exits:{W:"rainroom"},
    art:[
      "┌─────────────────┐",
      "│       ┌───┐     │",
      "│   @   │ ? │     │",
      "│       └───┘     │",
      "└───────┬─────────┘",
      "        │"
    ],
    text:[
      "A NARROW ROOM.",
      "",
      "A TALL MIRROR STANDS",
      "AGAINST THE FAR WALL.",
      "",
      "YOUR REFLECTION IS NOT THERE.",
      "",
      "SOMETHING ELSE IS."
    ]
  },

  chairroom:{
    exits:{S:"rainroom",E:"boardroom"},
    art:[
      "       │     │",
      "       │  @  ├────",
      "       │     │",
      "       │  h  │",
      "       └─────┘"
    ],
    text:[
      "A VERY SMALL ROOM.",
      "",
      "THERE IS A WOODEN CHAIR.",
      "",
      "IT FACES THE SOUTH WALL.",
      "",
      "THE SOUTH WALL IS BLANK."
    ]
  },

  boardroom:{
    exits:{W:"chairroom"},
    art:[
      "───────┐       ┌───────",
      "       │   @   │",
      "       │       │",
      "       │ o o o │",
      "       │ o o o │",
      "       └───────┘"
    ],
    text:[
      "A LOW STONE TABLE",
      "FILLS MOST OF THE ROOM.",
      "",
      "ON IT RESTS A LONG",
      "WOODEN BOARD.",
      "",
      "TWO ROWS OF SHALLOW CUPS",
      "HAVE BEEN CARVED INTO IT.",
      "",
      "MOST ARE EMPTY."
    ]
  },

  belowroom:{
    exits:{U:"boardroom"},
    art:[
      "        │   │",
      "        │ @ │",
      "        │   │",
      "        │ ♣ │",
      "        └───┘"
    ],
    text:[
      "YOU ARE UNDER THE BOARD ROOM.",
      "",
      "THIS SHOULD NOT BE POSSIBLE.",
      "",
      "A THIN ROOT EMERGES",
      "FROM THE CEILING.",
      "",
      "TIED TO IT IS",
      "A SMALL CLOTH BAG."
    ]
  }

};