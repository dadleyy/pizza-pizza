module Main exposing (..)

import Browser
import Html exposing (section, article, button, text, select, legend, fieldset, option, aside)
import Html.Attributes exposing (class, disabled, selected, value)
import Html.Events exposing (onClick, onInput)


type Topping = Pepperoni | Cheese
type alias Crust = { id : String,  name : String }
type Ingredient = Topping Topping | CrustSelection Crust | Sauce

type Message =
    AddIngredient Ingredient
  | RemoveChange Int
  | ModifyIngredient Int
  | UndoChange Int
  | Save

type Change = Addition Ingredient | Removal Ingredient | Modify Ingredient (List Ingredient) | NoChange Ingredient

type alias Model = { items : List Change }

main : Program () Model Message
main = Browser.document
  {
    init = init,
    view = view,
    update = update,
    subscriptions = subscriptions
  }

-- INIT

init : () -> ( Model, Cmd msg )
init _ =
  ( { items = [] }, Cmd.none )


-- VIEW
selectCrust : String -> Message
selectCrust selection =
  Debug.log ("selected: " ++ selection)
  ModifyIngredient 0

crustControl : Crust -> Html.Html Message
crustControl crust =
    fieldset [ class "ingredient-field" ] [
      legend [] [ text "crust" ],
      select [ class "crust-select", onInput selectCrust ] [
        option [ selected True, value "thin" ] [ text "thin" ],
        option [ selected False, value "thick" ] [ text "thick" ]
      ]
    ]

itemDisplay : Ingredient -> Html.Html Message
itemDisplay item =
  aside [ class "item-display" ] [
    case item of
      CrustSelection crust ->
        crustControl crust
      Topping _ ->
        text "topping"
      Sauce ->
        text "sauce"
  ]

renderItem : Int -> Change -> Html.Html Message
renderItem index item =
  case item of
    Addition addition ->
      article [ class "item-addition" ] [
        itemDisplay addition,
        aside [ class "item-controls" ] [
          button [ onClick (RemoveChange index) ] [ text "remove" ]
        ]
      ]
    Removal removal ->
      article [ class "item-removal" ] [
        itemDisplay removal,
        aside [ class "item-controls" ] [
          button [ onClick (UndoChange index) ] [ text "undo" ]
        ]
      ]
    Modify current history ->
      article [ class "item-modify" ] []
    NoChange value ->
      article [ class "item-no-change" ] [
        itemDisplay value,
        aside [ class "item-controls" ] [
          button [ onClick (RemoveChange index) ] [ text "remove" ]
        ]
      ]

view : Model ->  Browser.Document Message
view model =
  {
    title = "pizza pizza",
    body = [
      section [ class "pizza-maker" ] [
        section [ class "pizza-maker-controls" ] [
          button [ onClick (AddIngredient (Topping Pepperoni)) ] [ text "add topping" ],
          button [ onClick (AddIngredient (Crust Thin)), disabled (hasCrust model.items) ] [ text "add crust" ],
          button [ onClick (AddIngredient Sauce) ] [ text "add sauce" ],
          button [ onClick Save ] [ text "save" ]
        ],
        section [ class "pizza-maker-view" ] (List.indexedMap renderItem model.items)
      ]
    ]
  }


-- UPDATE

getCurrentvalue : Change -> Maybe Ingredient
getCurrentvalue change =
  case change of
    Addition addition -> Just addition
    Removal _ -> Nothing
    NoChange value -> Just value
    Modify value history -> Just value

isCrust : Maybe Ingredient -> Bool
isCrust maybe =
  case maybe of
    Nothing -> False
    Just item ->
      case item of
        Crust _ -> True
        Topping _ -> False
        Sauce -> False

hasCrust : List Change -> Bool
hasCrust list =
  List.any isCrust (List.map getCurrentvalue list)

removeChange : Int -> List Change -> List Change
removeChange index list =
  case List.head (List.drop index list) of
    Nothing ->
      list
    Just item ->
      case item of
        NoChange value ->
          List.concat [(List.take index list), [Removal value], (List.drop (index + 1) list)]
        Modify current history ->
          list
        Removal removal ->
          list
        Addition addition ->
          List.concat [(List.take index list), (List.drop (index + 1) list)]

undoChange : Int -> List Change -> List Change
undoChange index list =
  case List.head (List.drop index list) of
    Nothing ->
      []
    Just item ->
      case item of
        NoChange value ->
          List.concat [(List.take index list), [Removal value], (List.drop (index + 1) list)]
        Modify current history ->
          list
        Removal removal ->
          List.concat [(List.take index list), [NoChange removal], (List.drop (index + 1) list)]
        Addition addition ->
          List.concat [(List.take index list), (List.drop (index + 1) list)]

toNoChange : Change -> Change
toNoChange change =
  case change of
    NoChange value -> change
    Modify current history -> NoChange current
    Removal removal -> NoChange removal
    Addition addition -> NoChange addition

update : Message -> Model -> ( Model, Cmd msg )
update msg model =
  case msg of
    ModifyIngredient item ->
      ( model, Cmd.none )
    AddIngredient item ->
      ( { model | items = (Addition item) :: model.items } , Cmd.none )
    RemoveChange index ->
      ( { model | items = removeChange index model.items } , Cmd.none )
    UndoChange index ->
      ( { model | items = undoChange index model.items } , Cmd.none )
    Save ->
      ( { model | items = List.map toNoChange model.items } , Cmd.none )

-- Subscribe

subscriptions : Model -> Sub msg
subscriptions model =
  Sub.none
