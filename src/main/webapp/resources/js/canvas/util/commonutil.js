var componentSeq = {};
function getComponentSeq(componentType){
	var seq = componentSeq[componentType];
	if(seq == null){
		componentSeq[componentType] = 0;
		return 0;
	}else{
		componentSeq[componentType] = seq +1;
		return componentSeq[componentType];
	}
}