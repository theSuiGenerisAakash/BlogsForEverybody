import { Injectable } from '@angular/core';
import * as $ from 'jquery';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
	
	result: any;
	constructor(private _http: Http) { }
	
	testFunction(){
	
	$(function(){
		document.getElementById("ledit").onclick =function(){
			okay();
			submitFormEditable();
		}
		
		document.getElementById("wledit").onclick =function(){
			submitForm();
		}
		
		document.getElementById("submitquery").onclick = function(){
			getData();
		}
		
		document.getElementById("newscrib").onclick = function(){
			refreshh();
		}
	
		
		function refreshh(){
			window.location.href = "../../index.html";
		}
		function okay(){
			(document.getElementById("saveOrNot") as HTMLInputElement).value ="true";
		}
	
		function submitFormEditable(){
			var formData = $('#feedform').serialize();
			$.post('/api/feed', formData).done(function (data) {
				alert("Access token: "+data['hash']+"\nPassword: "+data['hashpwd']);
			}).fail(function() {
				alert("Something went wrong!");
			});
		}
	
		function submitForm(){
			var formData = $('#feedform').serialize();
			$.post('/api/feed', formData).done(function (data) {
				alert("Access token: "+data['hash']);
			}).fail(function() {
				alert("Something went wrong!");
			});
		}
		
		function getData(){
			
			var pwd="";
			var revData ={};
			var commData=[];
			
			function reSave(revData){
				var check = $('#pwdd').val();
				if(pwd == check){
					//alert(revData['hash']);
					$.post('/api/refeed', revData).done(function (data) {
						if(data['success']=='true')
							alert("Your blog has beeen updated");
					}).fail(function() {
						alert("Something went wrong!");
					});
				}
				else{
					alert("Wrong Password!");
				}
			}
			
			
			function getComments(param){
				for(var p of param)
					{
						$('#comm').append('<li style="border: 1px solid #7C66FF; display: block; padding: 4px;"><div><p style="font-size:16px; text-align:left;"><strong>Name</strong>:'+p.commentor+'<br/></p><p style="font-size:16px; text-align:left;"><strong>Comment</strong>:'+p.comment+'</p></div></li></p>');
					}
					param=[];
			}
			
			function getCommentNew(param){
				let pos = param.indexOf('&');
				let commentor = param.slice(10,pos);
				let comment = param.slice(pos+9,param.indexOf('&',pos+1));
				$('#comm').append('<li style="border: 1px solid #7C66FF; display: block; padding: 4px;"><div><p style="font-size:16px; text-align:left;"><strong>Name</strong>:'+commentor+'<br/></p><p style="font-size:16px; text-align:left;"><strong>Comment</strong>:'+comment+'</p></div></li></p>');
			}
			
		
			function pushComment(hash, cformData){
			//alert("In pushComment");
			    cformData+='&hash='+hash.slice(1);
			//	alert(JSON.stringify(cformData));
				$.post('/api/comment', cformData).done(function (data) {
					if(data['success']=='true')
						{
						getCommentNew(cformData);
						}
					}).fail(function() {
						alert("Something went wrong!");
					});
			}
			
			if($('#keywords').val()=="")
			{
				return;
			}
			$('#ledit').hide();
			$('#wledit').hide();
			var hash = $('#keywords').val();
			hash='/'+hash;
			$.get(hash, function(data){
				(document.getElementById("feedID") as HTMLInputElement).value = data['feed'];
				if('comments'in data){
					getComments(data['comments']);
					}
				$('#commentForm').show();
				//alert("commentForm displayed");
				document.getElementById("commentNow").onclick = function(){
					if($('#name').val()!="")
						pushComment(hash,$('#commentForm').serialize());
				}
				if(data['editable']=="true"){
					$('#resave').show();
					$('#pwdd').show();
					pwd = data['hashpwd'];
					revData = data;
					document.getElementById("resave").onclick = function(){
						revData['feed'] = (document.getElementById("feedID") as HTMLInputElement).value;
						reSave(revData);
					}
				}
				else{
					$('#resave').hide();
					$('#pwdd').hide();
				}
			});
		}
		
	});
	}
}
