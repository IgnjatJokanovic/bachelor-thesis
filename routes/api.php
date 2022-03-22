<?php

use App\Http\Controllers\PostsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/user/register', 'UserController@create');
Route::post('/user/login', 'UserController@login');
Route::get('/user/{slug}', 'UserController@show');
Route::post('/search', 'UserController@search');



Route::group(['middleware' => ['jwt.verify']], function () {

    //HANDLING USERS
    Route::prefix('user')->group(function () {
        Route::post("/add", "FriendshipController@sendRequest");
        Route::post('/logout', 'UserController@logout');
        Route::post("/accept/{id}", "FriendshipController@accept");
        Route::post("/friends/search", "FriendshipController@search");
        Route::post("/decline/{id}", "FriendshipController@decline");
    });

    //HANDLIGN POSTS
    Route::prefix('posts')->group(function () {
        Route::get('/', [PostsController::class, 'index']);
        Route::get('/{slug}', [PostsController::class, 'show']);
        Route::post('/create', [PostsController::class, 'create']);
        Route::post('/update', [PostsController::class, 'update']);
    });

    //HANDLIGN EMOJIS
    Route::get("/emojiList", "ReactionsController@index");
    //HANDLING POSTS

    Route::post("/article/create", "ArticleController@create");
});
