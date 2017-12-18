module.exports = function (Application){
	const {Q,o2s,s2o,fs,os,logger,devlog,Session,server_id,JobMgr
		,isEmpty,isOK,getTimeStr}=Application;

	///////////////////////////////////////////////////////////////////////////
	function Quit_Promise(x){
		var rt={STS:"OK",errmsg:"Will Quit Server("+server_id+") after 1 sec, please try reconnect later about 10 seconds for init."};
		setTimeout(()=>{
			Application.quit(x);
		},333);
		return Q(rt);
	}

	function SuperQuit_Promise(p){
		//Application.persist('is_running',false);
		StopStrategies_Promise(p);//2017-11-19.wjc: super quit新增停下策略，以防什么意外发生.
		Application.persist('auto_login_flag',false);
		return Quit_Promise(p);
	}

	function Ping_q(p){//throw new Error("testing");
		var ping=null;
		if(p && p.ping) ping=p.ping;
		var rt={STS:"OK"};
		rt.pong = new Date();
		if(ping){
			rt.ping=ping;
			rt.diff = (rt.pong.getTime() - (new Date(ping)).getTime())/1000;
		}
		return Q(rt);
	}
	//SIGINT
	function handleSIGINT(){
		Quit_Promise(1).done(()=>{
			logger.log('Quit for SIGINT/ctrl-c');
		});
		/*
			if(Application){
				var lgc=Application.getLogic();
				if(lgc){
					lgc.Quit_Promise().done(()=>{
						logger.log('Quit for SIGINT/ctrl-c');
					});
				}else{
					logger.log('Quit for SIGINT/ctrl-c');
				}
			}
			*/
	}
	function handleUncaughtException(err){
		Application.persist('LastUncaughtException',(err&&err.message)?err.message:(""+err));
		Quit_Promise(3).done(()=>{
			logger.log('Quit for uncaughtException',err);
		});
	}
	//var call=function(m,p){
	//	return _remoteModule.call(m,p);
	//};
	var rt={
		Quit_Promise,
		SuperQuit_Promise,
		//Health_Promise,
		//Ping_Promise,
		Ping_q,
		handleSIGINT,
		handleUncaughtException,
		//handleExit,
		//call,
		__filename,
	};
	return rt;
};

