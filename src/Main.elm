module Main exposing (..)

import Browser
import Html exposing (section, article, button, text)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)

type Message = AddItem Item

type Item = Topping | Crust | Sauce

type alias Model = { items : List Item }

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

renderItem : Item -> Html.Html msg
renderItem item =
  article [] []

view : Model ->  Browser.Document Message
view model =
  {
    title = "pizza pizza",
    body = [
      section [ class "pizza-maker" ] [
        section [ class "pizza-maker-controls" ] [
          button [ onClick (AddItem Topping) ] [ text "add topping" ],
          button [ ] [ text "add crust" ],
          button [ ] [ text "add sauce" ]
        ],
        section [ class "pizza-maker-view" ] (List.map renderItem model.items)
      ]
    ]
  }


-- UPDATE

update : Message -> Model -> ( Model, Cmd msg )
update msg model =
  case msg of
    AddItem item ->
      ( { model | items = item :: model.items } , Cmd.none )

-- Subscribe

subscriptions : Model -> Sub msg
subscriptions model =
  Sub.none
