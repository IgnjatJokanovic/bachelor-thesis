<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/user/register', 'UserController@create');
Route::post('/user/login', 'UserController@login');
Route::get('/user/{slug}', 'UserController@show');
Route::post('/search', 'UserController@search');



Route::group(['middleware' => ['jwt.verify']], function () {

    //HANDLING USERS

    Route::post("/user/add", "FriendshipController@sendRequest");
    Route::post('/user/logout', 'UserController@logout');
    Route::post("/user/accept/{id}", "FriendshipController@accept");
    Route::post("/user/decline/{id}", "FriendshipController@decline");

    //HANDLIGN EMOJIS
    Route::get("/reactions", "ReactionsController@index");
    //HANDLING POSTS

    Route::post("/article/create", "ArticleController@create");
});
