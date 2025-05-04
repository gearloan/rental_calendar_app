module ApplicationHelper
  include InlineSvg::ActionView::Helpers

  def rental_amenities
    [
      ["bed",       "Sleeping accommodations", "3br, 1 King, 2 Queens"],
      ["bathroom",  "Bathroom count",          "2 Full Bathrooms"],
      ["kitchen",   "Kitchen amenities",       "Well Stocked Kitchen"],
      ["stove",     "New appliances",          "New Appliances"],
      ["patio",     "Patio area",              "Spacious Patio"],
      ["grill",     "Outdoor grill",           "Propane Grill"],
      ["kayak",     "Kayaks included",         "2 Kayaks"],
      ["pier",      "Scenic pier access",      "Scenic Pier"],
      ["ac",        "Air conditioning",        "Central AC"],
      ["wifi",      "High-speed wifi",         "Fast WiFi"],
      ["location",  "Convenient location",     "Convenient Location"],
      ["lock",      "Keyless entry",           "Keyless Entry, no app required"]
    ]
  end

  def thoreau_quotes
    [
      "We must learn to reawaken and keep ourselves awake, not by mechanical aids, but by an infinite expectation of the dawn, which does not forsake us even in our soundest sleep.",
      "Heaven is under our feet as well as over our heads.",
      "Live in each season as it passes; breathe the air, drink the drink, taste the fruit, and resign yourself to the influence of the earth.",
      "An abode without birds is like a meat without seasoning.",
      "I believe that there is a subtle magnetism in Nature, which, if we unconsciously yield to it, will direct us aright.",
      "It is the marriage of the soul with nature that makes the intellect fruitful, and gives birth to imagination",
      "I have a room all to myself; it is nature.",
      "There are moments when all anxiety and stated toil are becalmed in the infinite leisure and repose of nature.",
      "My profession is to always find God in nature.",
      "Measure your health by your sympathy with morning and spring. If there is no response in you to the awakening of nature -if the prospect of an early morning walk does not banish sleep, if the warble of the first bluebird does not thrill you -know that the morning and spring of your life are past. Thus may you feel your pulse.",
      "There are certain pursuits which, if not wholly poetic and true, do at least suggest a nobler and finer relation to nature than we know. The keeping of bees, for instance.",
      "This curious world we inhabit is more wonderful than convenient; more beautiful than it is useful; it is more to be admired and enjoyed than used.",
      "Nature spontaneously keeps us well. Do not resist her!",
      "We need the tonic of wildness.",
      "Each new year is a surprise to us. We find that we had virtually forgotten the note of each bird, and when we hear it again, it is remembered like a dream, reminding us of a previous state of existence. How happens it that the associations it awakens are always pleasing, never saddening, reminiscences of our sanest hours. The voice of nature is always encouraging.",
      "There can be no very black melancholy to him who lives in the midst of Nature and has his senses still.",
      "The birds I heard today, which, fortunately, did not come within the scope of my science, sang as freshly as if it had been the first morning of creation.",
      "The bluebird carries the sky on his back.",
    ]
  end


end
