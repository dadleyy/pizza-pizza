module Main exposing (..)

import Browser
import Html exposing (article, aside, button, fieldset, legend, option, section, select, span, text)
import Html.Attributes exposing (class, disabled, selected, value)
import Html.Events exposing (onClick, onInput)


type Topping
    = Pepperoni
    | Cheese


type alias Crust =
    { id : String, name : String }


type Ingredient
    = Topping Topping
    | CrustSelection Crust
    | Sauce


type Message
    = AddIngredient Ingredient
    | RemoveChange Int
    | ModifyIngredient Int Ingredient
    | UndoChange Int
    | Save


type Change
    = Addition Ingredient
    | Removal Ingredient
    | Modify Ingredient (List Ingredient)
    | NoChange Ingredient


type alias Model =
    { items : List Change }


main : Program () Model Message
main =
    Browser.document
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }



-- INIT


init : () -> ( Model, Cmd msg )
init _ =
    ( { items = [] }, Cmd.none )



-- VIEW


parseCrust : String -> Ingredient
parseCrust selection =
    CrustSelection { name = selection, id = selection }


modifyCrust : (String -> Ingredient) -> Int -> String -> Message
modifyCrust parser index selection =
    ModifyIngredient index (parser selection)


crustControl : Crust -> Int -> Html.Html Message
crustControl crust index =
    fieldset [ class "ingredient-field" ]
        [ legend [] [ text ("crust: " ++ crust.name) ]
        , select [ class "crust-select", value crust.id, onInput (modifyCrust parseCrust index) ]
            [ option [ selected True, value "thin" ] [ text "thin" ]
            , option [ selected False, value "thick" ] [ text "thick" ]
            ]
        ]


itemDisplay : Ingredient -> Int -> Html.Html Message
itemDisplay item index =
    aside [ class "item-display" ]
        [ case item of
            CrustSelection crust ->
                crustControl crust index

            Topping _ ->
                text "topping"

            Sauce ->
                text "sauce"
        ]


faIcon : String -> Html.Html Message
faIcon icon =
    span [ class ("fas fa-" ++ icon) ] []


renderItem : Int -> Change -> Html.Html Message
renderItem index item =
    case item of
        Addition addition ->
            article [ class "item-addition" ]
                [ itemDisplay addition index
                , aside [ class "item-controls" ]
                    [ button [ onClick (RemoveChange index) ] [ faIcon "trash" ]
                    ]
                ]

        Removal removal ->
            article [ class "item-removal" ]
                [ itemDisplay removal index
                , aside [ class "item-controls" ]
                    [ button [ onClick (UndoChange index) ] [ faIcon "undo" ]
                    ]
                ]

        Modify current history ->
            article [ class "item-modify" ]
                [ itemDisplay current index
                , aside [ class "item-controls" ]
                    [ button [ onClick (UndoChange index) ] [ faIcon "undo" ]
                    ]
                ]

        NoChange value ->
            article [ class "item-no-change" ]
                [ itemDisplay value index
                , aside [ class "item-controls" ]
                    [ button [ onClick (RemoveChange index) ] [ faIcon "trash" ]
                    ]
                ]


makerControls : Model -> Html.Html Message
makerControls model =
    article [ class "pizza-maker-controls" ]
        [ button
            [ onClick (AddIngredient (Topping Pepperoni))
            ]
            [ text "add topping" ]
        , button
            [ onClick (AddIngredient (CrustSelection { id = "thin", name = "Thin" }))
            , disabled (hasCrust model.items)
            ]
            [ text "add crust" ]
        , button [ onClick (AddIngredient Sauce) ] [ text "add sauce" ]
        , button [ onClick Save ] [ text "save" ]
        ]


makerBody : Model -> List (Html.Html Message)
makerBody model =
    [ makerControls model, section [ class "pizza-maker-view" ] (List.indexedMap renderItem model.items) ]


view : Model -> Browser.Document Message
view model =
    { title = "pizza pizza"
    , body =
        [ section [ class "pizza-maker" ] (makerBody model) ]
    }



-- UPDATE


getCurrentvalue : Change -> Maybe Ingredient
getCurrentvalue change =
    case change of
        Addition addition ->
            Just addition

        Removal _ ->
            Nothing

        NoChange value ->
            Just value

        Modify value history ->
            Just value


isCrust : Maybe Ingredient -> Bool
isCrust maybe =
    case maybe of
        Nothing ->
            False

        Just item ->
            case item of
                CrustSelection _ ->
                    True

                Topping _ ->
                    False

                Sauce ->
                    False


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
                    List.concat [ List.take index list, [ Removal value ], List.drop (index + 1) list ]

                Modify current history ->
                    list

                Removal removal ->
                    list

                Addition addition ->
                    List.concat [ List.take index list, List.drop (index + 1) list ]


undoChange : Int -> List Change -> List Change
undoChange index list =
    case List.head (List.drop index list) of
        Nothing ->
            []

        Just item ->
            case item of
                NoChange value ->
                    List.concat [ List.take index list, [ Removal value ], List.drop (index + 1) list ]

                Modify current history ->
                    case List.head history of
                        Nothing ->
                            list

                        Just rollback ->
                            List.concat [ List.take index list, [ NoChange rollback ], List.drop (index + 1) list ]

                Removal removal ->
                    List.concat [ List.take index list, [ NoChange removal ], List.drop (index + 1) list ]

                Addition addition ->
                    List.concat [ List.take index list, List.drop (index + 1) list ]


toNoChange : Change -> Change
toNoChange change =
    case change of
        NoChange value ->
            change

        Modify current history ->
            NoChange current

        Removal removal ->
            NoChange removal

        Addition addition ->
            NoChange addition


modifyItem : List Change -> Int -> Ingredient -> List Change
modifyItem list index ingredient =
    case List.head (List.drop index list) of
        Nothing ->
            list

        Just item ->
            case item of
                NoChange value ->
                    List.concat [ List.take index list, [ Modify ingredient [ value ] ], List.drop (index + 1) list ]

                Modify previous history ->
                    List.concat
                        [ List.take index list
                        , [ Modify ingredient (previous :: history) ]
                        , List.drop (index + 1) list
                        ]

                Addition _ ->
                    List.concat [ List.take index list, [ Addition ingredient ], List.drop (index + 1) list ]

                Removal _ ->
                    List.concat [ List.take index list, [ Removal ingredient ], List.drop (index + 1) list ]


update : Message -> Model -> ( Model, Cmd msg )
update msg model =
    case msg of
        ModifyIngredient index item ->
            ( { model | items = modifyItem model.items index item }, Cmd.none )

        AddIngredient item ->
            ( { model | items = Addition item :: model.items }, Cmd.none )

        RemoveChange index ->
            ( { model | items = removeChange index model.items }, Cmd.none )

        UndoChange index ->
            ( { model | items = undoChange index model.items }, Cmd.none )

        Save ->
            ( { model | items = List.map toNoChange model.items }, Cmd.none )



-- Subscribe


subscriptions : Model -> Sub msg
subscriptions model =
    Sub.none
