/**
 * Created by lithium on 2017-03-03.
 */
// module.exports = {
//     checkLogin: function checkLogin(req, res, next) {
//         if (!req.session.user) {
//             req.flash('error', '未登录');
//             return res.redirect('/signin');
//         }
//         next();
//     },
//
//     checkNotLogin: function checkNotLogin(req, res, next) {
//         if (req.session.user) {
//             req.flash('error', '已登录');
//             return res.redirect('back');//返回之前的页面
//         }
//         next();
//     }
// };
module.exports={
    checkLogin:function (req,res,next) {
        // 通过session是否已经设置user判断用户是否登录
        if(!req.session.user){
            req.flash('error','未登录');
            return res.redirect('/signin')
        }
        next()
    },
    checkNotLogin:function (req,res,next) {
        if(req.session.user){
            req.flash('error','已登录');
            return res.redirect('back')
        };
        next();
    }
}